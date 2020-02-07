import React from 'react';

import Chat from './Chat';
import Greeting from './Greeting';
import axios from 'axios';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const url = '//localhost:8888/api/';
const wsUrl = 'http://localhost:8888/';

class ChatAuth extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = { isJoin: false, user, usersOnline: {}, messages: [], error: null };
  }

  componentDidMount = async () => {
    this.getMessages();
    this.getUsersOnline();
    this.stompClient = null;
  };

  componentWillUnmount = () => {
    this.disconnect();
  };

  connect = async e => {
    e.preventDefault();
    const { data } = await axios.get(`${url}chat/isForbidden`, { withCredentials: true });
    if (data) {
      // banned user
    } else {
      const { data } = await axios.get(`${url}chat/user`, { withCredentials: true });
      if (data.username) {
        const socket = new SockJS(`http://localhost:8888/ws`, null, {});
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, this.onConnected, this.onError);
      }
    }
  };

  disconnect = () => {
    const { user } = this.state;
    if (this.stompClient) {
      this.stompClient.send(
        `chat/delUser`,
        {},
        JSON.stringify({ sender: user.nickName, type: 'LEAVE' })
      );
      this.stompClient.unsubscribe(`${wsUrl}channel/public`);
      this.stompClient.disconnect();
    }
    this.setState({ isJoin: false });
  };

  onConnected = () => {
    this.setState({ error: null, isJoin: true });
    this.stompClient.subscribe(`/channel/public`, this.onMessageRecieved, {});
    const { user } = this.state;
    this.getMessages();
    this.stompClient.send(
      `/chat/addUser`,
      {},
      JSON.stringify({ sender: user.nickName, type: 'JOIN' })
    );
  };

  onError = err => {
    this.setState({ error: err });
  };

  getUsersOnline = async () => {
    this.setState({ usersOnline: {} });
    try {
      const response = await axios.get(`${url}chat/users`);
      this.setState({ usersOnline: response.data });
    } catch (error) {
      this.setState({ error });
    }
  };

  getMessages = async (page = 0) => {
    try {
      const { data } = await axios.get(`${url}chat/messages?page=${page}`);
      this.setState({ messages: data.slice().reverse() });
    } catch (error) {
      this.setState({ error });
    }
  };

  sendMessage = (msg, img, replyTo = null) => {
    console.log(msg, img);
    if (msg || img) {
      const { user } = this.props;
      const message = {
        sender: user.nickName,
        text: msg,
        senderAvatar: user.avatar,
        originalImg: img ? img.originalImg : null,
        thumbnailImg: img ? img.thumbnailImg : null,
        replyTo,
        type: 'MESSAGE',
      };
      this.stompClient.send(`/chat/sendMessage`, {}, JSON.stringify(message));
    }
  };

  onMessageRecieved = payload => {
    const message = JSON.parse(payload.body);
    const { messages } = this.state;
    this.setState({ messages: [...messages, message] });
    this.getUsersOnline();
  };

  render() {
    const { isJoin, messages, usersOnline } = this.state;
    const { user } = this.props;
    return !isJoin ? (
      <Greeting handleConnect={this.connect} />
    ) : (
      <Chat
        handleDisconnect={this.disconnect}
        usersOnline={usersOnline}
        messages={messages}
        sendMessage={this.sendMessage}
        user={user}
      />
    );
  }
}

export default ChatAuth;
