import React from 'react';
import { Row } from 'antd';

import queries from '../../serverQueries';
import TopicsList from '../Subsection/TopicsList';
import TopicsListItem from '../Subsection/TopicsListItem';

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      hasMore: true,
      page: 1,
    };
  }

  componentDidMount() {
    this.loadTopics();
  }

  loadTopics = async () => {
    const { page: oldPage } = this.state;
    const newTopics = await queries.getProfileSubscriptions(oldPage);

    // console.log('Subscriptions!!! = ', newTopics);

    if (newTopics.length === 0) {
      return this.setState({ hasMore: false });
    }

    const badApiAdaptationTopicsFixMePlease = newTopics.map(topic => ({
      topic,
      totalMessages: 0,
      isSubscribed: false,
      hasNewMessages: false,
      newMessagesCount: 0,
    }));

    return this.setState(({ topics, page }) => ({
      topics: [...topics, ...badApiAdaptationTopicsFixMePlease],
      page: page + 1,
    }));
  };

  render() {
    const { hasMore, topics } = this.state;

    if (topics.length === 0 && !hasMore) {
      return (
        <Row type="flex" justify="center">
          <h4>Подписок нет</h4>
        </Row>
      );
    }

    // return <h1>Subsctiption list here</h1>;

    return (
      <TopicsList
        itemComponent={item => <TopicsListItem topicData={item} />}
        items={topics}
        title=""
        fetchMessages={this.loadTopics}
        hasMore={hasMore}
      />
    );
  }
}

export default Subscriptions;
