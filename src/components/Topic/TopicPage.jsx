import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb, message, notification, Spin } from 'antd';
import TopicCommentsList from './TopicCommentsList';
import queries from '../../serverQueries';
import { GoldIcon, ReplyFloatButton } from './styled';
import TopicReplyForm from './TopicReplyForm';
import TopicCommentItem from './TopicCommentItem';
import Context from '../Context';

class TopicPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: null,
      messages: [],
    };
    this.replyForm = React.createRef();
  }

  componentDidMount() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);
    const queryPage = query.get('page') || 1;
    this.getTopics(parseInt(queryPage, 10));
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
  });

  getTopics = page => {
    const { match, history } = this.props;
    history.push(`${history.location.pathname}?page=${page}`);
    if (page === 1) {
      queries.getTopic(match.params.topicId, 0, 9).then(({ topic, commentDto }) => {
        this.setState({
          topic,
          messages: [this.topicToComment(topic), ...commentDto.content],
        });
      });
    } else {
      queries
        .getTopic(match.params.topicId, (page - 1) * 10 - 1, 10)
        .then(({ topic, commentDto }) => {
          this.setState({
            topic,
            messages: commentDto.content,
          });
        });
    }
  };

  replyButtonHandler = () => {
    this.replyForm.focus();
  };

  handleSubmitComment = (text, answerID = 0, resetForm) => {
    const { topic } = this.state;
    const { user } = this.context;
    return queries
      .addComment({
        messageComments: {
          text,
          idTopic: topic.id,
          idUser: user.userId,
          answerID,
        },
        image1: '',
        image2: '',
      })
      .then(() => {
        this.changePageHandler(Math.floor(topic.messageCount / 10) + 1);
        message.success('Ваше сообщение успешно добавлено');
        resetForm();
      })
      .catch(() => {
        message.error('Похоже, что-то не так. Сообщение добавить не удалось.');
      });
  };

  openNotification = () => {
    notification.open({
      message: 'Требуется авторизация',
      description: 'Только зарегистрированные пользователи могут оставлять комментарии.',
      icon: <GoldIcon type="warning" />,
    });
  };

  render() {
    const { messages, topic } = this.state;
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
              changePageHandler={this.getTopics}
              title={topic.name}
              messages={messages}
              itemComponent={item => <TopicCommentItem comment={item} />}
              total={topic.messageCount + 1}
            />
          </div>
        ) : (
          <Spin />
        )}
        <TopicReplyForm
          replyRef={element => {
            this.replyForm = element;
          }}
          handleSubmitComment={this.handleSubmitComment}
        />
        <ReplyFloatButton
          type="primary"
          icon="message"
          onClick={isLogin ? this.replyButtonHandler : this.openNotification}
        >
          Reply
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
