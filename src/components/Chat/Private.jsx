import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, message as systemMessage } from 'antd';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import queries from '../../serverQueries';
import {
  ChatContainer,
  Header,
  CloseButton,
  Main,
  MessageList,
  Message,
  MessageAvatar,
  MessageAuthor,
  MessageImage,
  MessageDate,
  MessageText,
  Form,
  Footer,
} from './styled';

const url = BASE_URL;

const Private = props => {
  const [message, setMessage] = useState('');
  const [filePath, setFilePath] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const history = useHistory();

  const handleChangeMessage = event => setMessage(event.target.value);

  const handleChangeFile = async event => {
    const { size } = event.target.files[0];
    if (size / 1024 / 1024 > 20) {
      systemMessage.error('Отправляемый файл не может быть больше 20 Мб');
      return;
    }
    setFilePath(event.target.value);
  };

  const uploadFile = async () => {
    const { chatToken } = props;
    if (!filePath) return;
    const form = document.querySelector('.message-form');
    const formData = new FormData(form);
    /*eslint-disable */
    return await queries.postFilePersonalChat(formData, chatToken);
  };

  const resetForm = () => {
    setMessage('');
    setFilePath('');
   };

  const handleSubmit = async event => {
    event.preventDefault();
    const file = await uploadFile();
    const { sendMessage } = props;
    await sendMessage(message, file, replyTo);
    resetForm();
  };

  const drawMessage = msg => {
    const { user } = props;
    const defaultAvatar = `default-sm.png`;
    if (msg.type === 'MESSAGE') {
      return (
        <Message toMe={user.nickName === msg.replyTo} key={msg.id}>
          <MessageAvatar
            alt="avatar"
            src={`${url}img/${msg.senderAvatar === null ? defaultAvatar : msg.senderAvatar}`}
            onClick={() => {
              setReplyTo(msg.sender);
              setMessage(`${msg.sender}, `);
            }}
          />
          <div>
            <MessageAuthor>{msg.sender}</MessageAuthor>
            {msg.originalImg ? (
              <a
                rel="noopener noreferrer"
                href={`${url}img/chat/${msg.originalImg}`}
                target="_blank"
              >
                <MessageImage
                  alt="picture"
                  className="message-image"
                  src={`${url}img/chat/${msg.thumbnailImg}`}
                />
              </a>
            ) : (
              ''
            )}
            {msg.filePath ? (
              <div>
                <a href={`${url}img/chat/${msg.filePath}`} download>
                  {msg.fileName}
                </a>
              </div>
            ) : (
              ''
            )}
            <MessageText className="message-text">{msg.text}</MessageText>
          </div>
          <MessageDate className="message-date">{msg.messageDate}</MessageDate>
        </Message>
      );
    }
    return '';
  };

  const handleDisconnect = evt => {
    evt.preventDefault();
    const { disconnect } = props;
    disconnect();
    history.push(`/`);
  };

  const { messages, anotherUserNick } = props;
  return (
    <section>
      <ChatContainer>
        <Header>
          <h2>{`Чат с пользователем ${anotherUserNick}`}</h2>
          <CloseButton onClick={handleDisconnect} />
        </Header>
        <Main>
          <div style={{ width: '100%' }}>
            <MessageList className="message-list">
              {messages.map(msg => drawMessage(msg))}
            </MessageList>
          </div>
        </Main>

        <Form className="message-form" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Введите сообщение..."
            className="message-input"
            value={message}
            onChange={handleChangeMessage}
          />
          <Footer>
            <input type="file" onChange={handleChangeFile} value={filePath} name="file-input" />
            <Button type="primary" className="send-button" htmlType="submit">
              Отправить
            </Button>
          </Footer>
        </Form>
      </ChatContainer>
    </section>
  );
};

export default Private;

Private.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  user: PropTypes.shape({
    nickName: PropTypes.string,
  }),
  chatToken: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object),
  anotherUserNick: PropTypes.string.isRequired,
  disconnect: PropTypes.func.isRequired,
};

Private.defaultProps = {
  user: null,
  messages: [],
};
