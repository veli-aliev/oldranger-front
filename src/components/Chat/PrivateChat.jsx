import uniqueId from 'lodash/uniqueId';
import React from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import Private from './Private';
import queries from '../../serverQueries';

const url = BASE_URL;

class PrivateChat extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = { user, anotherUserId: null, anotherUserNick: '', messages: [], show: false };
  }

  componentDidMount = async () => {
    const { user } = this.state;
    const { match = {} } = this.props;
    const { id = null } = match.params;
    if (Number(user.id) === Number(id)) {
      return;
    }
    const anotherUser = await queries.getAnotherUserData(id);
    if (anotherUser) {
      const chatToken = await queries.getPersonalToken(anotherUser.userId, user);
      this.setState({
        chatToken,
        anotherUserId: anotherUser.userId,
        anotherUserNick: anotherUser.nickName,
        show: true,
      });
      this.connect(chatToken);
    }
  };

  componentWillUnmount = () => {
    const { anotherUserId } = this.state;
    if (anotherUserId) {
      this.disconnect();
    }
  };

  connect = async token => {
    const socket = new SockJS(`${url}ws`, null, {});
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/channel/private/${token}`, this.onMessageRecieved, {});
      this.getMessages();
    });
  };

  disconnect = () => {
    const { chatToken } = this.state;
    this.stompClient.unsubscribe(`/channel/private/${chatToken}`);
    this.stompClient.disconnect();
  };

  sendMessage = async (msg, file, replyTo = null) => {
    const { chatToken, user } = this.state;
    if (msg || file) {
      const message = {
        sender: user.nickName,
        text: msg,
        senderAvatar: user.avatar,
        replyTo,
        type: 'MESSAGE',
        ...file,
      };
      this.stompClient.send(`/chat/send/${chatToken}`, {}, JSON.stringify(message));
    }
  };

  getMessages = async () => {
    const { chatToken } = this.state;
    let status = 200;
    let page = 0;
    let messages = [];
    while (status === 200) {
      /*eslint-disable */
      const response = await queries.getPersonalMessage(chatToken, page);
      status = response.status;
      page += 1;
      messages = [...messages, ...response.data];
    }
    this.setState({ messages: messages.reverse() });
    const last = document.querySelector('.message-list li:last-of-type');
    if (last) {
      last.scrollIntoView();
    }
  };

  onMessageRecieved = payload => {
    const message = JSON.parse(payload.body);
    // fakeId - это костыль, чтобы избежать постоянного перерендера
    // т.к. уникального ключа для событий c type JOIN/LEAVE нет
    if (!message.id) {
      message.id = uniqueId('fakeId-');
    }
    this.setState(state => ({ messages: [...state.messages, message] }));
    setTimeout(() => {
      const lastMessage = document.querySelector('.message-list li:last-of-type');
      lastMessage.scrollIntoView();
    }, 200);
  };

  render() {
    const { messages, user, chatToken, anotherUserNick, show } = this.state;
    if (!show) {
      return '';
    }
    return (
      <>
        <Private
          disconnect={this.disconnect}
          messages={messages}
          sendMessage={this.sendMessage}
          user={user}
          chatToken={chatToken}
          anotherUserNick={anotherUserNick}
        />
      </>
    );
  }
}

export default withRouter(PrivateChat);

PrivateChat.propTypes = {
  user: PropTypes.shape({
    nickName: PropTypes.string,
    avatar: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

PrivateChat.defaultProps = {
  user: null,
  match: { params: { id: null } },
};
