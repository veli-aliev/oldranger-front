import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Icon, Row } from 'antd';
import topicProps from '../Main/propTypes/topicProps';
import ClickableItemWrapper from './ClickableItemWrapper';
import { TopicItemInfo, TopicItemTitleUser, TopicItemMainInfo } from './styled';
import { dateToDateDistance } from '../../utils';

const TopicsListItem = ({ topicData, history }) => {
  const topicClickHandler = () => {
    const {
      topic: { photoAlbum },
    } = topicData;
    history.push({
      pathname: `/topic/${topicData.topic.id}`,
      state: { photoAlbumId: photoAlbum },
    });
  };
  return (
    <ClickableItemWrapper clickHandler={topicClickHandler}>
      <Row>
        <TopicItemMainInfo span={16}>
          <p>
            <strong>{topicData.topic.name}</strong>
          </p>
          <TopicItemTitleUser>
            от <b>{topicData.topic.topicStarter.nickName}</b>
          </TopicItemTitleUser>
        </TopicItemMainInfo>
        <Col span={6}>
          <Icon type="rollback" /> {dateToDateDistance(topicData.topic.lastMessageTime)} назад
        </Col>
        <TopicItemInfo span={2}>
          <p>
            <Icon type="message" /> {topicData.topic.messageCount}
          </p>
        </TopicItemInfo>
      </Row>
    </ClickableItemWrapper>
  );
};

TopicsListItem.propTypes = {
  topicData: PropTypes.shape({
    topic: topicProps.isRequired,
    totalMessages: PropTypes.number,
    isSubscribed: PropTypes.bool,
    hasNewMessages: PropTypes.bool,
    newMessagesCount: PropTypes.number,
  }).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(TopicsListItem);
