import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TopicCommentsList from './TopicCommentsList';
import queries from '../../serverQueries';
import { ReplyFloatButton } from './styled';
import TopicReplyForm from './TopicReplyForm';
import TopicCommentItem from './TopicCommentItem';

class TopicPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      name: '',
      hasMore: true,
      page: 1,
    };
    this.replyForm = React.createRef();
  }

  componentDidMount() {
    this.getTopic(0).then(data => {
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

  getTopic = async page => {
    const { match } = this.props;
    return queries.getTopic(match.params.topicId, page);
  };

  lazyLoadMore = () => {
    const { messages, page } = this.state;
    this.getTopic(page).then(({ commentDto }) => {
      if (commentDto.length === 0) {
        this.setState({ hasMore: false });
      } else {
        this.setState({ messages: [...messages, ...commentDto], page: page + 1 });
      }
    });
  };

  replyButtonHandler = () => {
    this.replyForm.focus();
  };

  render() {
    const { hasMore, messages, name } = this.state;
    return (
      <div>
        <TopicCommentsList
          title={name}
          fetchMessages={this.lazyLoadMore}
          hasMore={hasMore}
          messages={messages}
          itemComponent={item => <TopicCommentItem comment={item} />}
        />
        <ReplyFloatButton type="primary" icon="message" onClick={this.replyButtonHandler}>
          Reply
        </ReplyFloatButton>
        <TopicReplyForm
          replyRef={element => {
            this.replyForm = element;
          }}
        />
      </div>
    );
  }
}

TopicPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(TopicPage);
