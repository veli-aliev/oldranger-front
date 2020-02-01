import React from 'react';
import _ from 'lodash';

import { Input, Button } from 'antd';
import './css/Chat.css';
import axios from 'axios';

const url = 'http://localhost:8888/api';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '', image: null, replyTo: null };
  }

  componentDidUpdate = () => {
    const lastMessage = document.querySelector('.message-list li:last-child');
  };

  handleChangeMessage = e => {
    this.setState({ message: e.target.value });
  };

  handleChangeFile = async e => {
    this.setState({ imagePath: e.target.value });

    const form = document.querySelector('.message-form');
    const formData = new FormData(form);
    const { data } = await axios.post(`${url}/chat/image`, formData, {
      headers: { 'content-type': 'multipart/form-data' },
      withCredentials: true,
    });
    this.setState({ image: data });
  };

  handleSendMessage = e => {
    e.preventDefault();
    const { sendMessage } = this.props;
    const { message, image, replyTo } = this.state;
    sendMessage(message, image, replyTo);
    this.setState({ message: '', image: null, imagePath: '' });
  };

  drawMessage = msg => {
    if (msg.type === 'MESSAGE') {
      return (
        <li
          className="message"
          key={_.uniqueId()}
          onClick={() => this.setState({ replyTo: msg.sender, message: `${msg.sender}, ` })}
        >
          <img
            alt="avatar"
            className="message-avatar"
            src={`http://localhost:8888/img/${msg.senderAvatar}`}
          />
          <div>
            <div className="message-author">{msg.sender}</div>
            <img
              alt="picture"
              className="message-image"
              src={`http://localhost:8888/img/chat/${msg.thumbnailImg}`}
            />
            <p className="message-text">{msg.text}</p>
          </div>
          <span className="message-date">{msg.messageDate}</span>
        </li>
      );
    } else {
      return (
        <li className="event-message" key={_.uniqueId()}>
          {`${msg.sender} ${msg.type === 'LEAVE' ? 'покинул чат' : 'присоединился'}`}
        </li>
      );
    }
  };

  render() {
    const { handleDisconnect, messages, usersOnline } = this.props;
    console.log(this.state.replyTo);
    return (
      <section className="chat">
        <div className="chat-container">
          <header className="chat-header">
            <h2>Chat</h2>
            <button className="button-close" onClick={handleDisconnect} />
          </header>

          {/* <div className="connecting">Подключаюсь...</div> */}

          <div className="chat-main">
            <div className="user-area">
              <span className="indicator-online" />
              <h3 className="user-list-title">Online:</h3>
              <ul className="user-list">
                {Object.keys(usersOnline).map((user, index) => (
                  <li className="user" key={user}>
                    <a href={`${url}/profile/${index}`}>{user}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="message-area">
              <ul className="message-list">{messages.map(msg => this.drawMessage(msg))}</ul>
            </div>
          </div>

          <form className="message-form" name="messageForm">
            <Input
              type="text"
              placeholder="Введите сообщение..."
              className="message-input"
              value={this.state.message}
              onChange={this.handleChangeMessage}
            />
            <div className="form-buttons">
              <input
                type="file"
                name="file-input"
                className="file-input"
                onChange={this.handleChangeFile}
                value={this.state.imagePath}
              />
              <Button type="primary" className="send-button" onClick={this.handleSendMessage}>
                Отправить
              </Button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Chat;
