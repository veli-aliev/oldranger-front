import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Avatar, Breadcrumb, message, notification, Spin, Typography } from 'antd';
import Comment from 'antd/es/comment';
import TopicCommentsList from './TopicCommentsList';
import queries from '../../serverQueries';
import { GoldIcon, ReplyFloatButton, TopicCommentReplyAlert } from './styled';
import TopicReplyForm from './TopicReplyForm';
import TopicCommentItem from './TopicCommentItem';
import Context from '../Context';

const { Text } = Typography;

class TopicPage extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const query = new URLSearchParams(location.search);
    this.state = {
      topic: null,
      messages: [],
      page: query.get('page') || 1,
      reply: null,
      answerId: null,
      files: [],
      uploading: false,
    };
    this.replyForm = React.createRef();
  }

  componentDidMount() {
    const { page } = this.state;
    this.getTopics(parseInt(page, 10));
  }

  topicToComment = topic => ({
    positionInTopic: 0,
    topicId: topic.subsection.id,
    author: topic.topicStarter,
    commentDateTime: topic.startTime,
    messageCount: topic.messageCount,
    replyDateTime: null,
    replyNick: null,
    replyText: null,
    commentText: topic.startMessage,
    photos: [], // no topic images from backend at this moment
  });

  getTopics = page => {
    // Get a topic and a list of comments for this topic by topic id
    const { match } = this.props;
    if (page === 1) {
      queries.getTopic(match.params.topicId, 0, 9).then(({ topic, commentDto }) => {
        this.setState({
          topic,
          page,
          messages: commentDto ? [this.topicToComment(topic), ...commentDto.content] : null,
        });
      });
    } else {
      queries
        .getTopic(match.params.topicId, (page - 1) * 10 - 1, 10)
        .then(({ topic, commentDto }) => {
          this.setState({
            topic,
            page,
            messages: commentDto ? commentDto.content : null,
          });
        });
    }
  };

  changePageHandler = page => {
    const { history } = this.props;
    history.push(`${history.location.pathname}?page=${page}`);
    this.getTopics(page);
  };

  replyButtonHandler = () => {
    this.replyForm.focus();
  };

  handleQuoteComment = comment => () => {
    const { isLogin } = this.context;
    if (isLogin) {
      this.replyForm.focus();
      this.setState({
        reply: {
          replyDateTime: comment.commentDateTime,
          replyNick: comment.author.nickName,
          replyText: comment.commentText,
        },
        answerId: comment.commentId,
      });
    } else {
      this.openNotification();
    }
  };

  handleSubmitComment = async (messageText, resetForm) => {
    if (messageText === '') {
      notification.open({
        message: 'Сообщение не может быть пустым',
        description: 'Максимальное количество символов 500000',
        icon: <GoldIcon type="warning" />,
      });
      return;
    }

    this.setState({ uploading: true });
    const { topic, answerId, files } = this.state;
    const { user } = this.context;
    const { history } = this.props;
    const messageComentsEntity = {
      idTopic: topic.id,
      idUser: user.userId,
      text: messageText.trim(),
    };

    if (answerId) {
      messageComentsEntity.answerID = answerId;
    }

    [messageComentsEntity.image1, messageComentsEntity.image2] = files;
    try {
      await queries.addComment(messageComentsEntity);
      const lastPage = Math.floor(topic.messageCount / 10 + 1);
      history.push(`${history.location.pathname}?page=${lastPage}`);
      this.getTopics(lastPage);
      message.success('Ваше сообщение успешно добавлено');
      this.setState({ reply: null, answerId: null, files: [], uploading: false });
      resetForm();
    } catch {
      message.error('Похоже, что-то не так. Сообщение добавить не удалось.');
      this.setState({ uploading: false });
    }
  };

  handleDeleteComment = commentId => {
    queries
      .deleteComment(commentId)
      .then(() => {
        const { page } = this.state;
        this.getTopics(page);
        message.success('Сообщение удалено');
      })
      .catch(() => {
        message.error('Похоже, что-то не так. Сообщение удалить не удалось.');
      });
  };

  openNotification = () => {
    notification.open({
      message: 'Требуется авторизация',
      description: 'Только зарегистрированные пользователи могут оставлять комментарии.',
      icon: <GoldIcon type="warning" />,
    });
  };

  handleCancelReply = () => {
    this.setState({ reply: null, answerId: null });
  };

  handleAddFile = info => {
    this.setState({ files: info.fileList });
    if (info.file.status !== 'removed') {
      message.success(`Файл ${info.file.name} успешно добавлен`);
    }
  };

  render() {
    const { messages, topic, page, reply, files, uploading } = this.state;
    const { isLogin } = this.context;
    return (
      <div>
        {topic ? (
          <div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Главная</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/section/${topic.section.id}`}>{topic.section.name}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/subsection/${topic.subsection.id}`}>{topic.subsection.name}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/topic/${topic.id}`}>{topic.name}</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <TopicCommentsList
              changePageHandler={this.changePageHandler}
              title={topic.name}
              messages={messages}
              itemComponent={item => (
                <TopicCommentItem
                  comment={item}
                  handleQuoteComment={this.handleQuoteComment}
                  deleteComment={this.handleDeleteComment}
                  getTopics={this.getTopics}
                  page={page}
                />
              )}
              total={topic.messageCount + 1}
              page={page}
            />
          </div>
        ) : (
          <Spin />
        )}
        {reply && (
          <TopicCommentReplyAlert
            type="success"
            closeText="Отменить комментирование"
            onClose={this.handleCancelReply}
            message={
              <span>
                Ответ на сообщение пользователя <Text strong>{reply.replyNick}</Text>{' '}
                <Text code>{reply.replyText}</Text>
              </span>
            }
          />
        )}
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <TopicReplyForm
              replyRef={element => {
                this.replyForm = element;
              }}
              handleSubmitComment={this.handleSubmitComment}
              handleAddFile={this.handleAddFile}
              files={files}
              uploading={uploading}
            />
          }
        />
        <ReplyFloatButton
          type="primary"
          icon="message"
          onClick={isLogin ? this.replyButtonHandler : this.openNotification}
        >
          Ответить
        </ReplyFloatButton>
      </div>
    );
  }
}

TopicPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

TopicPage.contextType = Context;

export default withRouter(TopicPage);
