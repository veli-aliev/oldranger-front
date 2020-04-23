/* eslint-disable no-await-in-loop */
import uniqueId from 'lodash/uniqueId';
import React from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import { BASE_URL } from '../../constants';
import Chat from './Chat';
import queries from '../../serverQueries';

const url = BASE_URL;

class ChatAuth extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = { isJoin: false, user, usersOnline: {}, messages: [] };
  }

  componentWillUnmount = () => {
    this.disconnect();
  };

  componentDidMount = async () => {
    await this.connect();
  };

  connect = async () => {
    const isForb = await queries.isForbidden();
    if (isForb) {
      // banned user
    } else {
      const currentUser = await queries.getCurrentUser();
      if (currentUser.username) {
        const socket = new SockJS(`${url}ws`, null, {});
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, this.onConnected, () => {});
      }
    }
  };

  disconnect = () => {
    const { user } = this.state;
    const { history } = this.props;
    if (this.stompClient) {
      this.stompClient.send(
        `chat/delUser`,
        {},
        JSON.stringify({ sender: user.nickName, type: 'LEAVE' })
      );
      this.stompClient.unsubscribe(`/channel/public`);
      this.stompClient.disconnect();
    }
    this.setState({ isJoin: false });
    history.push('/');
  };

  onConnected = () => {
    this.setState({ isJoin: true });
    this.stompClient.subscribe(`/channel/public`, this.onMessageRecieved, {});
    const { user } = this.state;
    this.getMessages();
    this.stompClient.send(
      `/chat/addUser`,
      {},
      JSON.stringify({ sender: user.nickName, type: 'JOIN' })
    );
  };

  getUsersOnline = async () => {
    // this.setState({ usersOnline: {} });
    const usersOnline = await queries.getAllUsers();
    this.setState({ usersOnline });
  };

  getMessages = async (isFull = false) => {
    if (isFull) {
      let status = 200;
      let page = 0;
      let messages = [];
      while (status === 200) {
        const response = await queries.getAllMessages(page);
        status = response.status;
        page += 1;
        messages = [...messages, ...response.data];
      }
      this.setState({ messages: messages.slice().reverse() });
    } else {
      const { data } = await queries.getAllMessages(0);
      this.setState({ messages: data ? data.slice().reverse() : [] });
    }
  };

  sendMessage = (msg, file, replyTo = null) => {
    if (msg || file) {
      const { user } = this.props;
      const message = {
        sender: user.nickName,
        text: msg,
        senderAvatar: user.avatar,
        replyTo,
        type: 'MESSAGE',
        ...file,
      };
      this.stompClient.send(`/chat/sendMessage`, {}, JSON.stringify(message));
    }
  };

  onMessageRecieved = payload => {
    const message = JSON.parse(payload.body);

    // fakeId - это костыль, чтобы избежать постоянного перерендера
    // т.к. уникального ключа для событий c type JOIN/LEAVE нет
    if (!message.id) {
      message.id = uniqueId('fakeId-');
    }

    this.setState(state => ({
      messages: [...state.messages, message],
    }));
    this.getUsersOnline();
    setTimeout(() => {
      const lastMessage = document.querySelector('.message-list li:last-of-type');
      lastMessage.scrollIntoView();
    }, 200);
  };

  deleteCurrentMessage = async id => {
    const { messages } = this.state;
    queries.deleteMessage(id);
    this.setState({ messages: messages.filter(msg => msg.id !== id) });
  };

  render() {
    const { isJoin, messages, usersOnline } = this.state;
    const { user } = this.props;
    return isJoin ? (
      <Chat
        handleDisconnect={this.disconnect}
        deleteCurrentMessage={this.deleteCurrentMessage}
        usersOnline={usersOnline}
        messages={messages}
        sendMessage={this.sendMessage}
        user={user}
        getMessages={this.getMessages}
        postFile={queries.postFile}
        label="Общий чат"
      />
    ) : (
      <Spin />
    );
  }
}

export default withRouter(ChatAuth);

ChatAuth.propTypes = {
  user: PropTypes.shape({
    nickName: PropTypes.string,
    avatar: PropTypes.string,
  }),
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

ChatAuth.defaultProps = {
  user: null,
};
