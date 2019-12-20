import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import TopicCommentsList from './TopicCommentsList';
import queries from '../../serverQueries';
import { ReplyFloatButton, StyledTopicMessages } from './styled';
import TopicReplyForm from './TopicReplyForm';

class TopicPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      messages: [],
      hasMore: true,
      page: 0,
    };
    this.replyForm = React.createRef();
  }

  componentDidMount() {
    this.getTopics().then(data => {
      const { topic, commentDto } = data;
      const messageFromTopic = {
        topicId: topic.subsection.id,
        author: topic.topicStarter,
        commentDateTime: topic.startTime,
        messageCount: topic.messageCount,
        replyDateTime: null,
        replyNick: null,
        replyText: null,
        commentText: topic.startMessage,
      };
      this.setState({ messages: [messageFromTopic, ...commentDto], name: topic.name });
    });
  }

  getTopics = async () => {
    const { match } = this.props;
    const { page } = this.state;
    const resp = await queries.getTopic(match.params.topicId, page);
    this.setState({ page: page + 1 });
    return resp;
  };

  replyButtonHandler = () => {
    this.replyForm.focus();
  };

  lazyLoadMore = () => {
    const { messages } = this.state;
    this.getTopics().then(({ commentDto }) => {
      if (commentDto.length === 0) {
        this.setState({ hasMore: false });
      } else {
        this.setState({ messages: [...messages, ...commentDto] });
      }
    });
  };

  render() {
    const { messages, name, hasMore } = this.state;
    return messages.length > 0 ? (
      <StyledTopicMessages>
        <h1>{name}</h1>
        <TopicCommentsList messages={messages} loadMore={this.lazyLoadMore} hasMore={hasMore} />
        <ReplyFloatButton type="primary" icon="message" onClick={this.replyButtonHandler}>
          Reply
        </ReplyFloatButton>
        <TopicReplyForm
          replyRef={element => {
            this.replyForm = element;
          }}
        />
      </StyledTopicMessages>
    ) : (
      <Spin />
    );
  }
}

TopicPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(TopicPage);
