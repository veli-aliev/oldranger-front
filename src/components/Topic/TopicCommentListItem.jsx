import React from 'react';
import { parseISO, format, formatDistanceToNow } from 'date-fns';
import { Avatar, Comment, Popover, Tooltip } from 'antd';
import ru from 'date-fns/locale/ru';
import PropTypes from 'prop-types';
import { ListItem } from './styled';
import TopicUserInfo from './TopicUserInfo';
import TopicPhotoList from './TopicPhotoList';
import fileProps from './propTypes/fileProps';
import commentProps from './propTypes/commentProps';

const TopicCommentListItem = ({
  comment,
  withActions,
  toggleEdeting,
  convertedImages,
  commentActions,
  contentEditingForm,
  contentCommentText,
}) => {
  return (
    <ListItem id={comment.positionInTopic + 1}>
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
        content={toggleEdeting ? contentEditingForm : contentCommentText}
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
      {convertedImages && !toggleEdeting && <TopicPhotoList fileList={convertedImages} />}
    </ListItem>
  );
};

export default TopicCommentListItem;

TopicCommentListItem.defaultProps = {
  withActions: false,
  convertedImages: null,
};

TopicCommentListItem.propTypes = {
  withActions: PropTypes.bool,
  toggleEdeting: PropTypes.bool.isRequired,
  commentActions: PropTypes.node.isRequired,
  contentEditingForm: PropTypes.node.isRequired,
  contentCommentText: PropTypes.node.isRequired,
  convertedImages: PropTypes.arrayOf(fileProps),
  comment: commentProps.isRequired,
};
