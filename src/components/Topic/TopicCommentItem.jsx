import React from 'react';
import { Row } from 'antd';
import { formatDistance, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import PropTypes from 'prop-types';
import UserInfoBlock from './UserInfoBlock';
import MessageBlock from './MessageBlock';
import { StyledCommentItem, UserMessageCol, UserInfoCol, CommentAction } from './styled';

const TopicCommentItem = ({ message }) => {
  return (
    <StyledCommentItem
      bordered="true"
      key={message.topicId}
      actions={[
        <span>
          <CommentAction type="calendar" key="list-vertical-star-o" />
          {`${formatDistance(parseISO(message.commentDateTime), new Date(), { locale: ru })} назад`}
        </span>,
      ]}
    >
      <Row>
        <UserInfoCol span={6}>
          <UserInfoBlock
            user={{
              nickName: message.nickName,
              roleName: message.roleName,
              smallAvatar: message.smallAvatar,
              timeSinceRegistration: message.timeSinceRegistration,
              messageCount: message.messageCount,
            }}
          />
        </UserInfoCol>
        <UserMessageCol span={18}>
          <MessageBlock messageBody={message.commentText} />
        </UserMessageCol>
      </Row>
    </StyledCommentItem>
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
