import React from 'react';
import _ from 'lodash';

import { Input, Button } from 'antd';
import './css/Chat.css';
import axios from 'axios';

const url = 'http://localhost:8888';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '', image: null, imagePath: '', replyTo: null, isFull: false };
  }

  componentDidMount = () => {
    const input = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-button');
    const lastMessage = document.querySelector('.message-list li:last-child');

    input.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        sendButton.click();
      }
    });
    lastMessage.scrollIntoView();
  };

  handleChangeMessage = e => {
    this.setState({ message: e.target.value });
  };

  handleChangeFile = async e => {
    this.setState({ imagePath: e.target.value });

    const form = document.querySelector('.message-form');
    const formData = new FormData(form);
    const { data } = await axios.post(`${url}/api/chat/image`, formData, {
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

  handleShowFull = e => {
    e.preventDefault();
    this.setState({ isFull: true });
    const firstMessage = document.querySelector('.message-list li:nth-child(2)');
    console.log(firstMessage);
    firstMessage.scrollIntoView();
  };

  drawMessage = msg => {
    const { user } = this.props;
    if (msg.type === 'MESSAGE') {
      return (
        <li
          className={`message ${user.nickName === msg.replyTo ? 'toMe' : ''}`}
          key={_.uniqueId()}
          onClick={() => this.setState({ replyTo: msg.sender, message: `${msg.sender}, ` })}
        >
          <img alt="avatar" className="message-avatar" src={`${url}/img/${msg.senderAvatar}`} />
          <div>
            <div className="message-author">{msg.sender}</div>
            {msg.originalImg ? (
              <img
                alt="picture"
                className="message-image"
                src={`${url}/img/chat/${msg.thumbnailImg}`}
              />
            ) : (
              ''
            )}
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
    const { message, imagePath, isFull } = this.state;
    return (
      <section className="chat">
        <div className="chat-container">
          <header className="chat-header">
            <h2>Chat</h2>
            <button className="button-close" onClick={handleDisconnect} />
          </header>
          <div className="chat-main">
            <div className="user-area">
              <span className="indicator-online" />
              <h3 className="user-list-title">Online:</h3>
              <ul className="user-list">
                {Object.entries(usersOnline).map(user => (
                  <li className="user" key={user}>
                    <a className="user-link" href={`/profile/${user[1]}`}>
                      {user[0]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="message-area">
              <ul className="message-list">
                {isFull || messages.length < 20 ? (
                  messages.map(msg => this.drawMessage(msg))
                ) : (
                  <>
                    <button className="full-messages" onClick={this.handleShowFull}>
                      <span className="arrow-up" />
                    </button>
                    {messages.slice(-19).map(msg => this.drawMessage(msg))}
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="message-form">
            <Input
              type="text"
              placeholder="Введите сообщение..."
              className="message-input"
              value={message}
              onChange={this.handleChangeMessage}
            />
            <div className="form-buttons">
              <input
                type="file"
                name="file-input"
                className="file-input"
                onChange={this.handleChangeFile}
                value={imagePath}
              />
              <Button type="primary" className="send-button" onClick={this.handleSendMessage}>
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Chat;
