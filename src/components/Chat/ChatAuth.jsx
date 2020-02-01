import React from 'react';

import Chat from './Chat';
import Greeting from './Greeting';
import axios from 'axios';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const url = '//localhost:8888/api/';
const wsUrl = 'http://localhost:8888/';
let stompClient = null;

class ChatAuth extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = { isJoin: false, user, usersOnline: {}, messages: [], error: null };
  }

  componentDidMount = async () => {
    this.getMessages();
    this.getUsersOnline();
  };

  connect = async e => {
    e.preventDefault();
    console.log('connect');
    const { data } = await axios.get(`${url}chat/isForbidden`, { withCredentials: true });
    if (data) {
      // banned user
    } else {
      // this.setState({ isJoin: true });
      const { data } = await axios.get(`${url}chat/user`, { withCredentials: true });
      console.log(data);
      if (data.username) {
        const socket = new SockJS(`http://localhost:8888/ws`, null, {});
        stompClient = Stomp.over(socket);
        // stompClient.connect('Prospect', 'prospect', this.onConnected, this.onError);
        stompClient.connect({}, this.onConnected, this.onError);
      }
    }
  };

  disconnect = e => {
    e.preventDefault();
    const { user } = this.state;
    stompClient.send(
      `${wsUrl}chat/delUser`,
      {},
      JSON.stringify({ sender: user.username, type: 'LEAVE' })
    );
    stompClient.unsubcribe(`${wsUrl}channel/public`);
    stompClient.disconnect();
    this.setState({ isJoin: false });
  };

  onConnected = () => {
    this.setState({ error: null, isJoin: true });
    stompClient.subcribe(`${wsUrl}channel/public`, this.onMessageRecieved, {});
    const { user } = this.state;
    stompClient.send(
      `${wsUrl}chat/addUser`,
      {},
      JSON.stringify({ sender: user.username, type: 'JOIN' })
    );
    this.getMessages();
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
      const response = await axios.get(`${url}chat/messages?page=${page}`);
      this.setState({ messages: response.data.reverse() });
    } catch (error) {
      this.setState({ error });
    }
  };

  sendMessage = (msg, img, replyTo = null) => {
    if (msg || img) {
      const { user } = this.props;
      const message = {
        sender: user.nickName,
        text: msg,
        senderAvatar: user.avatar,
        originalImg: img.originalImg,
        thumbnailImg: img.thumbnailImg,
        replyTo,
        type: 'MESSAGE',
      };
      stompClient.send(`${wsUrl}chat/sendMessage`, {}, JSON.stringify(message));
    }
  };

  onMessageRecieved = payload => {
    const message = JSON.parse(payload.body);
    console.log(message);
    const { messages } = this.state;
    this.setState({ messages: [...messages, message] });
    this.getUsersOnline();
  };

  render() {
    const { isJoin, messages, usersOnline } = this.state;
    return !isJoin ? (
      <Greeting handleConnect={this.connect} />
    ) : (
      <Chat
        handleDisconnect={this.disconnect}
        usersOnline={usersOnline}
        messages={messages}
        sendMessage={this.sendMessage}
      />
    );
  }
}

export default ChatAuth;
