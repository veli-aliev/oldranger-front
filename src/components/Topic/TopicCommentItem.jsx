import React from 'react';
import { Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import UserInfoBlock from './UserInfoBlock';
import MessageBlock from './MessageBlock';
import { StyledUserInfoBlock, StyledTopicComment, StyledMessageBlock } from './styled';

const TopicCommentItem = ({ message }) => {
  return (
    <StyledTopicComment
      bordered="true"
      key={message.topicId}
      actions={[
        <span>
          <Icon type="calendar" key="list-vertical-star-o" className="comment--action-icon" />
          {message.commentDateTime.split('T').join(' ')}
        </span>,
      ]}
    >
      <Row>
        <StyledUserInfoBlock span={6}>
          <UserInfoBlock
            user={{
              nickName: message.nickName,
              roleName: message.roleName,
              smallAvatar: message.smallAvatar,
              timeSinceRegistration: message.timeSinceRegistration,
              messageCount: message.messageCount,
            }}
          />
        </StyledUserInfoBlock>
        <StyledMessageBlock span={18}>
          <MessageBlock messageBody={message.commentText} />
        </StyledMessageBlock>
      </Row>
    </StyledTopicComment>
  );
};

TopicCommentItem.propTypes = {
  message: PropTypes.shape({
    nickName: PropTypes.string,
    roleName: PropTypes.string,
    smallAvatar: PropTypes.string,
    timeSinceRegistration: PropTypes.string,
    messageCount: PropTypes.number,
    commentDateTime: PropTypes.string,
    topicId: PropTypes.number,
    commentText: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default TopicCommentItem;
