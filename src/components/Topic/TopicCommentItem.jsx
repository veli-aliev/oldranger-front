/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Avatar, Comment, Popover, Tooltip, Icon } from 'antd';
import { parseISO, format, formatDistanceToNow } from 'date-fns';
import ru from 'date-fns/locale/ru';
import PropTypes from 'prop-types';
import { ReplyTag, ListItem } from './styled';
import TopicEditingForm from './TopicEditingForm';
import TopicUserInfo from './TopicUserInfo';
import commentProps from './propTypes/commentProps';
import TopicPhotoList from './TopicPhotoList';
import Context from '../Context';

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

  render() {
    const { comment, handleQuoteComment, deleteComment, getTopics, page } = this.props;
    const { withActions, toggleEdeting } = this.state;
    const { user } = this.context;
    const convertedImages = comment.imageComment.map(image => ({
      uid: `-${String(image.id)}`,
      url: `http://localhost:8888/img/imageComment/${image.img}`,
      name: String(image.id),
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
        Ответить на сообщение {comment.author.nickName}
      </span>,
      user.nickName === 'Admin' || user.nickName === 'Moderator' ? (
        <IconText type="edit" onHandleClick={this.handleClickEditBtn} title="Редактировать" />
      ) : null,
      user.nickName === 'Admin' || user.nickName === 'Moderator' ? (
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
            <ReplyTag color="magenta">{comment.replyNick}</ReplyTag>
          </Popover>
          {comment.commentText}
        </p>
      );
    } else {
      contentCommentText = comment.commentText;
    }

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
