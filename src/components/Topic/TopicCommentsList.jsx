import React from 'react';
import PropTypes from 'prop-types';
import TopicCommentItem from './TopicCommentItem';
import queries from '../../serverQueries';
import { CommentList } from './styled';

class TopicCommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      topic: {},
    };
  }

  componentDidMount() {
    const { topicId } = this.props;
    queries
      .getTopic(topicId)
      .then(topic => {
        this.setState({ topic: { ...topic, title: topic.name } });
        return {
          nickName: topic.topicStarter.nickName,
          roleName: topic.topicStarter.role.role,
          smallAvatar: topic.topicStarter.avatar.small,
          timeSinceRegistration: topic.topicStarter.regDate,
          messageCount: topic.topicStarter.messageCount,
          commentDateTime: topic.startTime,
          topicId: topic.id,
          commentText: 'Здесь будет сообщение топика',
          title: topic.name,
        };
      })
      .then(optimizedTopic => {
        queries
          .getTopicComments(topicId)
          .then(usersComments => this.setState({ comments: [optimizedTopic, ...usersComments] }));
      });
  }

  render() {
    const { comments, topic } = this.state;
    return (
      <CommentList
        itemLayout="vertical"
        size="large"
        bordered="true"
        header={<h3>{topic.title}</h3>}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={comments}
        renderItem={comment => <TopicCommentItem message={comment} />}
      />
    );
  }
}

TopicCommentsList.propTypes = {
  topicId: PropTypes.string.isRequired,
};

export default TopicCommentsList;
