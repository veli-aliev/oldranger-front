import React from 'react';
import { Icon, Avatar } from 'antd';
import { parseISO, format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import PropTypes from 'prop-types';
import PropTypesUser from './propTypes/userProps';
import {
  TopicHeaderContainer,
  TopicHeaderHeading,
  TopicHeaderTitle,
  TopicHeaderDate,
  TopicHeaderSpan,
  TopicHeaderAuthorWrapp,
  TopicHeaderAuthorWrappCol,
  TopicHeaderAuthorNickName,
  TopicHeaderAuthorAuthor,
  TopicHeaderDefaultMessage,
} from './TopicHeaderStyled';

const TopicStartMessage = ({ topic }) => {
  return (
    <TopicHeaderContainer>
      <TopicHeaderHeading>Топик</TopicHeaderHeading>
      <TopicHeaderTitle>{topic.name}</TopicHeaderTitle>
      <TopicHeaderDate>
        <TopicHeaderSpan>
          <Icon type="calendar" style={{ fontSize: '25px' }} theme="outlined" />
        </TopicHeaderSpan>
        <TopicHeaderSpan>
          {format(parseISO(topic.startTime), "dd MMMM yyyy 'в' HH:mm", {
            locale: ru,
          })}
        </TopicHeaderSpan>
      </TopicHeaderDate>
      <TopicHeaderAuthorWrapp>
        <TopicHeaderAuthorWrappCol>
          <Avatar shape="square" size={64} icon="user" />
        </TopicHeaderAuthorWrappCol>
        <TopicHeaderAuthorWrappCol>
          <TopicHeaderAuthorNickName>{topic.topicStarter.nickName}</TopicHeaderAuthorNickName>
          <TopicHeaderAuthorAuthor>Автор</TopicHeaderAuthorAuthor>
        </TopicHeaderAuthorWrappCol>
      </TopicHeaderAuthorWrapp>
      <TopicHeaderDefaultMessage>{topic.startMessage}</TopicHeaderDefaultMessage>
    </TopicHeaderContainer>
  );
};

TopicStartMessage.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    messageCount: PropTypes.number,
    startTime: PropTypes.string,
    lastMessageTime: PropTypes.string,
    startMessage: PropTypes.string,
    topicStarter: PropTypesUser.isRequired,
  }).isRequired,
};

export default TopicStartMessage;
