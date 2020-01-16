import React from 'react';
import { Avatar, Icon, List, Popover } from 'antd';
import { parseISO, format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StyledTopicCommentItem } from './styled';
import TopicUserInfo from './TopicUserInfo';
import commentProps from './propTypes/commentProps';

const TopicCommentItem = ({ comment, handleQuoteComment }) => {
  return (
    <StyledTopicCommentItem
      id={`comment${comment.topicId}`}
      actions={[
        <Icon type="double-right" onClick={handleQuoteComment(comment)} />,
        <span>#{comment.positionInTopic + 1}</span>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Popover
            content={
              <TopicUserInfo user={{ ...comment.author, messageCount: comment.messageCount }} />
            }
            placement="right"
          >
            <Avatar
              size={64}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </Popover>
        }
        title={
          <div>
            <Link to={`/profile/${comment.author.nickName}`}>{comment.author.nickName}</Link>{' '}
            {format(parseISO(comment.commentDateTime), "dd MMMM 'в' HH:mm", { locale: ru })}
          </div>
        }
        description={comment.commentText}
      />
    </StyledTopicCommentItem>
  );
};

TopicCommentItem.propTypes = {
  comment: commentProps.isRequired,
  handleQuoteComment: PropTypes.func.isRequired,
};

export default TopicCommentItem;
