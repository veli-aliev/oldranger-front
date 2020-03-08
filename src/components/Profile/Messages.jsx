import React from 'react';
import { Row } from 'antd';

import queries from '../../serverQueries';
import TopicCommentsList from '../Topic/TopicCommentsList';
import TopicCommentItem from '../Topic/TopicCommentItem';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      hasMore: true,
      page: 1,
    };
  }

  componentDidMount() {
    this.loadMessages();
  }

  loadMessages = async () => {
    const { page: oldPage } = this.state;
    const newMessages = await queries.getProfileComments(oldPage);
    if (newMessages.length === 0) {
      return this.setState({ hasMore: false });
    }

    return this.setState(({ messages, page }) => ({
      messages: [...messages, ...newMessages],
      page: page + 1,
    }));
  };

  updateMessages = updatedComment => {
    this.setState(({ messages }) => {
      const updatedComments = messages.map(mes =>
        mes.commentId === updatedComment.commentId ? updatedComment : mes
      );
      return { messages: updatedComments };
    });
  };

  render() {
    const { hasMore, messages } = this.state;

    if (messages.length === 0 && !hasMore) {
      return (
        <Row type="flex" justify="center">
          <h4>Сообщений нет</h4>
        </Row>
      );
    }

    return (
      <TopicCommentsList
        itemComponent={item => (
          <TopicCommentItem comment={item} updateComments={this.updateMessages} />
        )}
        messages={messages}
        title=""
        fetchMessages={this.loadMessages}
        hasMore={hasMore}
      />
    );
  }
}

export default Messages;
