import React from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import queries from '../../serverQueries';
import {
  ChatContainer,
  Header,
  CloseButton,
  Main,
  UserListTitle,
  OnlineLED,
  UserList,
  User,
  UserLink,
  MessageList,
  Message,
  EventMessage,
  MessageAvatar,
  MessageAuthor,
  MessageImage,
  MessageDate,
  MessageText,
  ShowFullButton,
  Arrow,
  Form,
  Footer,
} from './styled';

const url = process.env.BASE_URL || 'http://localhost:8888/';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '', image: null, imagePath: '', replyTo: null, isFull: false };
  }

  handleChangeMessage = event => {
    this.setState({ message: event.target.value });
  };

  handleChangeFile = async event => {
    this.setState({ imagePath: event.target.value });

    const form = document.querySelector('.message-form');
    const formData = new FormData(form);
    const image = await queries.getImage(formData);
    this.setState({ image });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { sendMessage } = this.props;
    const { message, image, replyTo } = this.state;
    sendMessage(message, image, replyTo);
    this.setState({ message: '', image: null, imagePath: '' });
  };

  handleShowFull = () => {
    const { getMessages } = this.props;
    getMessages(true);
    this.setState({ isFull: true });
  };

  drawMessage = msg => {
    const { user } = this.props;
    if (msg.type === 'MESSAGE') {
      return (
        <Message
          toMe={user.nickName === msg.replyTo}
          key={`${msg.id}`}
          onClick={() => this.setState({ replyTo: msg.sender, message: `${msg.sender}, ` })}
        >
          <MessageAvatar alt="avatar" src={`${url}img/${msg.senderAvatar}`} />
          <div>
            <MessageAuthor>{msg.sender}</MessageAuthor>
            {msg.originalImg ? (
              <a href={`${url}img/chat/${msg.originalImg}`}>
                <MessageImage
                  alt="picture"
                  className="message-image"
                  src={`${url}img/chat/${msg.thumbnailImg}`}
                />
              </a>
            ) : (
              ''
            )}
            <MessageText className="message-text">{msg.text}</MessageText>
          </div>
          <MessageDate className="message-date">{msg.messageDate}</MessageDate>
        </Message>
      );
    }
    return (
      <EventMessage className="event-message" key={lodash.uniqueId()}>
        {`${msg.sender} ${msg.type === 'LEAVE' ? 'покинул чат' : 'присоединился'}`}
      </EventMessage>
    );
  };

  render() {
    const { handleDisconnect, messages, usersOnline } = this.props;
    const { message, imagePath, isFull } = this.state;
    return (
      <section>
        <ChatContainer>
          <Header>
            <h2>Chat</h2>
            <CloseButton onClick={handleDisconnect} />
          </Header>
          <Main>
            <div style={{ width: '20%' }}>
              <OnlineLED />
              <UserListTitle>Online:</UserListTitle>
              <UserList>
                {Object.entries(usersOnline).map(user => (
                  <User key={user}>
                    <UserLink href={`/profile/${user[1]}`}>{user[0]}</UserLink>
                  </User>
                ))}
              </UserList>
            </div>
            <div style={{ width: '80%' }}>
              <MessageList className="message-list">
                {isFull ? (
                  ''
                ) : (
                  <ShowFullButton onClick={this.handleShowFull}>
                    <Arrow />
                  </ShowFullButton>
                )}
                {messages.map(msg => this.drawMessage(msg))}
              </MessageList>
            </div>
          </Main>

          <Form className="message-form" onSubmit={this.handleSubmit}>
            <Input
              type="text"
              placeholder="Введите сообщение..."
              className="message-input"
              value={message}
              onChange={this.handleChangeMessage}
            />
            <Footer>
              <input
                type="file"
                onChange={this.handleChangeFile}
                value={imagePath}
                name="file-input"
              />
              <Button type="primary" className="send-button" htmlType="submit">
                Отправить
              </Button>
            </Footer>
          </Form>
        </ChatContainer>
      </section>
    );
  }
}

export default Chat;

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  handleDisconnect: PropTypes.func.isRequired,
  user: PropTypes.shape({
    nickName: PropTypes.string,
  }),
  usersOnline: PropTypes.shape({}),
  messages: PropTypes.arrayOf(PropTypes.object),
};

Chat.defaultProps = {
  user: null,
  usersOnline: {},
  messages: [],
};
