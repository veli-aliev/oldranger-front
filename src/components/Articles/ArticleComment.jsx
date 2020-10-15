import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ru from 'date-fns/locale/ru';
import { parseISO, format, formatDistanceToNow } from 'date-fns';
import { Comment, Tooltip, Popover } from 'antd';
import Context from '../Context';
import roles, { SECURED_ALBUM_URL } from '../../constants';
import { CommentContentView } from '../commons/HTMLContentViews';
import TopicUserInfo from '../Topic/TopicUserInfo';
import UserAvatar from '../commons/UserAvatar';
import CommentForm from '../forms/CommentForm';
import TopicPhotoList from '../Topic/TopicCommentsList';

const ArticleComment = props => {
  const {
    comment,
    commentWithOpenEditor,
    onOpenEditorClick,
    onSubmitCommentForm,
    onDeleteComment,
    eventType,
  } = props;

  const {
    id: commentId,
    parentId,
    commentText: text,
    commentDateTime: date,
    author,
    nested,
    deleted,
    photos,
  } = comment;

  const { user } = useContext(Context);

  const actionsArr = [];
  actionsArr.push(
    <span
      role="button"
      tabIndex="0"
      key="reply"
      onKeyPress={onOpenEditorClick(commentId, 'reply')}
      onClick={onOpenEditorClick(commentId, 'reply')}
    >
      Ответить
    </span>
  );

  const { role, id: userId } = user;
  const hasPermission = role === roles.admin || role === roles.moderator;

  if (author.id === userId || hasPermission) {
    actionsArr.push(
      <span
        key="edit"
        role="button"
        tabIndex="0"
        onKeyPress={onOpenEditorClick(commentId, 'edit')}
        onClick={onOpenEditorClick(commentId, 'edit')}
      >
        Редактировать
      </span>
    );
    actionsArr.push(
      <span
        key="delete"
        role="button"
        tabIndex="0"
        onKeyPress={onDeleteComment(commentId, parentId)}
        onClick={onDeleteComment(commentId, parentId)}
      >
        Удалить
      </span>
    );
  }

  const nestedComments = nested.map(item => (
    <ArticleComment
      key={item.id}
      comment={item}
      commentWithOpenEditor={commentWithOpenEditor}
      onOpenEditorClick={onOpenEditorClick}
      onSubmitCommentForm={onSubmitCommentForm}
      onDeleteComment={onDeleteComment}
      eventType={eventType}
    />
  ));

  const convertedImages = photos.map(photo => {
    const url = `${SECURED_ALBUM_URL}${photo.id}?type=original`;
    return {
      uid: `-${String(photo.id)}`,
      url,
      name: `Photo_name_${photo.description}`,
      status: 'done',
    };
  });

  return (
    <Comment
      actions={deleted ? null : actionsArr}
      author={author.nickName}
      datetime={
        <Tooltip
          title={format(parseISO(date), "dd MMMM yyyy 'в' HH:mm", {
            locale: ru,
          })}
        >
          <span>
            {formatDistanceToNow(parseISO(date), {
              locale: ru,
              addSuffix: true,
            })}
          </span>
        </Tooltip>
      }
      avatar={
        <Popover content={<TopicUserInfo user={author} />} placement="right">
          <UserAvatar src={author.avatar.small} />
        </Popover>
      }
      content={<CommentContentView dangerouslySetInnerHTML={{ __html: text }} />}
    >
      {commentId === commentWithOpenEditor && eventType === 'edit' && (
        <CommentForm startText={text} onSubmit={onSubmitCommentForm(commentId, parentId)} />
      )}
      {commentId === commentWithOpenEditor && eventType === 'reply' && (
        <CommentForm startText="" onSubmit={onSubmitCommentForm(commentId, parentId)} />
      )}
      {nestedComments}
      {convertedImages.length > 0 && <TopicPhotoList fileList={convertedImages} />}
    </Comment>
  );
};

ArticleComment.defaulProps = {
  commentWithOpenEditor: null,
};

ArticleComment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nested: PropTypes.array.isRequired,
    author: PropTypes.object.isRequired,
    commentDateTime: PropTypes.string,
    commentText: PropTypes.string,
    deleted: PropTypes.bool,
    parentId: PropTypes.number,
    photos: PropTypes.array.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  commentWithOpenEditor: PropTypes.number,
  onOpenEditorClick: PropTypes.func.isRequired,
  onSubmitCommentForm: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  eventType: PropTypes.string.isRequired,
};

export default ArticleComment;
