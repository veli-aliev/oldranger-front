import React, { useContext } from 'react';
import { parseISO, format, formatDistanceToNow } from 'date-fns';
import { Avatar, Comment, Popover, Tooltip } from 'antd';
import ru from 'date-fns/locale/ru';
import PropTypes from 'prop-types';
import { BASE_URL_IMG, DEFAULT_AVATAR_PICTURE_URL } from '../Constants';
import { ListItem } from './styled';
import TopicUserInfo from './TopicUserInfo';
import TopicPhotoList from './TopicPhotoList';
import fileProps from './propTypes/fileProps';
import commentProps from './propTypes/commentProps';
import Context from '../Context';

const TopicCommentListItem = ({
  comment,
  withActions,
  toggleEdeting,
  convertedImages,
  commentActions,
  contentEditingForm,
  contentCommentText,
  contentReplyText,
}) => {
  const { isLogin } = useContext(Context);
  return (
    <ListItem id={comment.positionInTopic + 1}>
      <Comment
        actions={withActions ? commentActions : null}
        author={
          !contentReplyText ? (
            comment.author.nickName
          ) : (
            <span>
              {comment.author.nickName} {contentReplyText}
            </span>
          )
        }
        avatar={
          <Popover
            content={
              <TopicUserInfo user={{ ...comment.author, messageCount: comment.messageCount }} />
            }
            placement="right"
          >
            <Avatar
              src={
                isLogin
                  ? `${BASE_URL_IMG}${comment.author.avatar.small}`
                  : `${DEFAULT_AVATAR_PICTURE_URL}`
              }
            />
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
  contentReplyText: null,
};

TopicCommentListItem.propTypes = {
  withActions: PropTypes.bool,
  toggleEdeting: PropTypes.bool.isRequired,
  commentActions: PropTypes.node.isRequired,
  contentEditingForm: PropTypes.node.isRequired,
  contentCommentText: PropTypes.node.isRequired,
  convertedImages: PropTypes.arrayOf(fileProps),
  comment: commentProps.isRequired,
  contentReplyText: PropTypes.node,
};
