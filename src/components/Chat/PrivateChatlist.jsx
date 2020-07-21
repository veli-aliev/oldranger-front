import React, { useEffect } from 'react';
import { uniqueId } from 'lodash';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import { PrivateChatContainer, MessageContainer, Avatar, PrivateMessage } from './styled';
import queries from '../../serverQueries';
import { BASE_URL as url } from '../../constants';

export default function PrivateChatlist() {
  // нет функционала на бэке
  useEffect(() => queries.getPrivateMessages(), []);

  const testMessageData = (unread, text = 'Текст cообщения', author = 'Moderator') => {
    return {
      avatar: '',
      author,
      messageShort: text,
      unreadCount: unread,
      // clearHistory: (this.id) => {//нет функционала}
    };
  };

  const renderChatItems = dialogues => {
    return dialogues.map(dialogue => {
      const { author, messageShort, unreadCount } = dialogue;
      const messageArray = messageShort.split('');
      let message = '';
      if (messageArray.length > 70) {
        messageArray.length = 70;
        message = `${messageArray.join('')}...`;
      } else {
        message = messageArray.join('');
      }

      return (
        <Link key={uniqueId('id_')} to="/profile/private/2">
          <MessageContainer>
            <div style={{ width: '10%' }}>
              <Avatar src={`${url}img/default-sm.png`} alt="" style={{ width: '40px' }} />
            </div>
            <div style={{ width: '85%' }}>
              <h3 style={{ margin: '0' }}>{author}</h3>
              <PrivateMessage>{message}</PrivateMessage>
            </div>
            {unreadCount > 0 ? (
              <Badge style={{ position: 'absolute' }} count={unreadCount} />
            ) : null}
          </MessageContainer>
        </Link>
      );
    });
  };

  return (
    <PrivateChatContainer>
      {renderChatItems([
        testMessageData(0),
        testMessageData(
          0,
          'Очень длинный текст 111111111111111111112222222222222fghjdfelirfglierjgerjglierjgoierjgoijrg'
        ),
        testMessageData(100, 'Текст с непрочитанными'),
        testMessageData(0),
        testMessageData(0),
        testMessageData(0),
        testMessageData(0),
        testMessageData(0),
        testMessageData(0),
        testMessageData(0),
        testMessageData(0),
        testMessageData(0),
        testMessageData(0),
        testMessageData(0),
      ])}
    </PrivateChatContainer>
  );
}
