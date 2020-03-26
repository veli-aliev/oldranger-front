import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ru from 'date-fns/locale/ru';
import { parseISO, format, formatDistanceToNow } from 'date-fns';
import { Comment, Tooltip, Popover } from 'antd';
import Context from '../Context';
import roles from '../../constants';
import { CommentContentView } from '../commons/HTMLContentViews';
import TopicUserInfo from '../Topic/TopicUserInfo';
import UserAvatar from '../commons/UserAvatar';
import CommentForm from '../forms/CommentForm';

const ArticleComment = props => {
  const {
    comment,
    commentWithOpenEditor,
    onOpenEditorClick,
    onSubmitCommentForm,
    onDeleteComment,
  } = props;

  const { id: commentId, commentText: text, commentDateTime: date, author, nested } = comment;
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
        onKeyPress={onDeleteComment(commentId)}
        onClick={onDeleteComment(commentId)}
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
    />
  ));

  return (
    <Comment
      actions={actionsArr}
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
      {commentId === commentWithOpenEditor && (
        <CommentForm onSubmit={onSubmitCommentForm(commentId)} />
      )}
      {nestedComments}
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
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  commentWithOpenEditor: PropTypes.number,
  onOpenEditorClick: PropTypes.func.isRequired,
  onSubmitCommentForm: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default ArticleComment;
