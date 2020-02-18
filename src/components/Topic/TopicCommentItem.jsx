/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Popover, Tooltip, Icon } from 'antd';
import { parseISO, formatDistanceToNow } from 'date-fns';
import ru from 'date-fns/locale/ru';
import PropTypes from 'prop-types';
import { ReplyTag } from './styled';
import TopicEditingForm from './TopicEditingForm';
import commentProps from './propTypes/commentProps';
import TopicCommentListItem from './TopicCommentListItem';
import Context from '../Context';
import userRoles from '../UserRoles';

const IconText = ({ type, onHandleClick, title }) => (
  <Tooltip placement="topRight" title={title}>
    <span onClick={onHandleClick}>
      <Icon type={type} theme="twoTone" />
    </span>
  </Tooltip>
);

class TopicCommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEdeting: false,
      withActions: true,
    };
    this.edetingForm = React.createRef();
  }

  handleClickEditBtn = () => {
    this.setState({ toggleEdeting: true, withActions: false });
  };

  handleCancel = () => {
    this.setState({ toggleEdeting: false, withActions: true });
  };

  showFieldOrNot() {
    const { user } = this.context;
    const { comment } = this.props;
    return (
      (user.id === comment.author.id && comment.updatable === true) ||
      user.role === userRoles.admin ||
      user.role === userRoles.moderator
    );
  }

  render() {
    const { comment, handleQuoteComment, deleteComment, getTopics, page } = this.props;
    const { withActions, toggleEdeting } = this.state;
    const convertedImages = comment.photos.map(photo => {
      return {
        uid: `-${String(photo.id)}`,
        url: `http://localhost:8888/api/securedPhoto/photoFromAlbum/${photo.id}?type=small`,
        name: `Photo_name_${photo.description}`,
        status: 'done',
      };
    });
    const commentActions = [
      <span key="comment-basic-position">#{comment.positionInTopic}</span>,
      <span
        key="comment-basic-reply-to"
        onClick={handleQuoteComment(comment)}
        onKeyPress={handleQuoteComment(comment)}
        role="button"
        tabIndex="0"
      >
        Ответить на сообщение {comment.author.nickName}
      </span>,
      this.showFieldOrNot() ? (
        <IconText type="edit" onHandleClick={this.handleClickEditBtn} title="Редактировать" />
      ) : null,
      this.showFieldOrNot() ? (
        <IconText
          type="delete"
          onHandleClick={() => {
            deleteComment(comment.commentId);
          }}
          title="Удалить"
        />
      ) : null,
    ];

    let contentCommentText = null;
    const contentEditingForm = (
      <TopicEditingForm
        edetingText={comment.commentText}
        fileList={convertedImages}
        replyRef={element => {
          this.edetingForm = element;
        }}
        handleCancel={this.handleCancel}
        idTopic={comment.topicId}
        idUser={comment.author.id}
        commentId={comment.commentId}
        getTopics={getTopics}
        page={page}
      />
    );
    if (comment.replyNick) {
      contentCommentText = (
        <p>
          <Popover
            content={comment.replyText}
            title={`${comment.replyNick}, ${formatDistanceToNow(parseISO(comment.replyDateTime), {
              locale: ru,
              addSuffix: true,
            })}`}
            placement="topLeft"
          >
            <ReplyTag color="green">
              (Ответ на комментарий <strong>{comment.replyNick}</strong>)
            </ReplyTag>
          </Popover>
          {comment.commentText}
        </p>
      );
    } else if (comment.rootDeleted) {
      contentCommentText = (
        <p>
          <ReplyTag color="magenta">(Ответ на удаленный комментарий)</ReplyTag>
          {comment.commentText}
        </p>
      );
    } else {
      contentCommentText = <p>{comment.commentText}</p>;
    }

    return (
      <TopicCommentListItem
        comment={comment}
        withActions={withActions}
        toggleEdeting={toggleEdeting}
        convertedImages={convertedImages}
        commentActions={commentActions}
        contentCommentText={contentCommentText}
        contentEditingForm={contentEditingForm}
      />
    );
  }
}

TopicCommentItem.contextType = Context;

IconText.propTypes = {
  type: PropTypes.string.isRequired,
  onHandleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

TopicCommentItem.propTypes = {
  comment: commentProps.isRequired,
  handleQuoteComment: PropTypes.func,
  deleteComment: PropTypes.func,
  getTopics: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

TopicCommentItem.defaultProps = {
  handleQuoteComment: () => {},
  deleteComment: () => {},
};

export default TopicCommentItem;
