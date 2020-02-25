import React from 'react';
import { Icon, Avatar } from 'antd';
import { parseISO, format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

const ImageWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 239px;
  margin: 3px;
`;

const StyledImage = styled.img`
  object-fit: cover;
  object-position: top center;
  width: 239px;
  height: 150px;
  border: 1px solid black;
`;

const TopicStartMessage = ({ topic, images, toggleLightbox }) => {
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
      <div>
        {images.map((image, index) => (
          <ImageWrapper onClick={() => toggleLightbox(index)} key={image.id}>
            <StyledImage title="user`s image" alt="userImage" src={image.src} />
          </ImageWrapper>
        ))}
      </div>
    </TopicHeaderContainer>
  );
};

TopicStartMessage.propTypes = {
  toggleLightbox: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      original: PropTypes.string,
      small: PropTypes.string,
      uploadPhotoDate: PropTypes.string,
      album: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      }),
      src: PropTypes.string,
    })
  ).isRequired,
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
