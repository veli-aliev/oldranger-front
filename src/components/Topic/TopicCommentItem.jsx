import React from 'react';
import { Avatar, Comment, Popover, Tooltip } from 'antd';
import { parseISO, format, formatDistanceToNow } from 'date-fns';
import ru from 'date-fns/locale/ru';
import PropTypes from 'prop-types';
import TopicUserInfo from './TopicUserInfo';
import commentProps from './propTypes/commentProps';
import TopicPhotoList from './TopicPhotoList';

const TopicCommentItem = ({ comment, handleQuoteComment, withActions }) => {
  const convertedImages = comment.imageComment.map(image => ({
    uid: image.id,
    url: image.img,
    name: image.id,
    status: 'done',
  }));

  const commentActions = [
    <span key="comment-basic-position">#{comment.positionInTopic + 1}</span>,
    <span
      key="comment-basic-reply-to"
      onClick={handleQuoteComment(comment)}
      onKeyPress={handleQuoteComment(comment)}
      role="button"
      tabIndex="0"
    >
      Комментировать
    </span>,
  ];

  return (
    <li id={comment.positionInTopic + 1}>
      <Comment
        actions={withActions ? commentActions : null}
        author={comment.author.nickName}
        avatar={
          <Popover
            content={
              <TopicUserInfo user={{ ...comment.author, messageCount: comment.messageCount }} />
            }
            placement="right"
          >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </Popover>
        }
        content={comment.commentText}
        datetime={
          <Tooltip
            title={format(parseISO(comment.commentDateTime), "dd MMMM yyyy 'в' HH:mm", {
              locale: ru,
            })}
          >
            <span>
              {formatDistanceToNow(parseISO(comment.commentDateTime), {
                locale: ru,
                addSuffix: true,
              })}
            </span>
          </Tooltip>
        }
      />
      {convertedImages && <TopicPhotoList fileList={convertedImages} />}
    </li>
  );
};

TopicCommentItem.propTypes = {
  comment: commentProps.isRequired,
  handleQuoteComment: PropTypes.func,
  withActions: PropTypes.bool,
};

TopicCommentItem.defaultProps = {
  handleQuoteComment: () => {},
  withActions: false,
};

export default TopicCommentItem;
