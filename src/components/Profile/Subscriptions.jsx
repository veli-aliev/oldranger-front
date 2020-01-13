import React from 'react';
import PropTypes from 'prop-types';
import { Row, Spin } from 'antd';

import { withGetData } from '../hoc';
import TopicsList from '../Subsection/TopicsList';
import TopicsListItem from '../Subsection/TopicsListItem';

const Subscriptions = ({ isLoading, data: subscriptions }) => {
  if (isLoading) {
    return <Spin />;
  }

  if (subscriptions.length === 0) {
    return (
      <Row type="flex" justify="center">
        <h4>Тем нет</h4>
      </Row>
    );
  }

  const badApiAdaptationTopicsFixMePlease = subscriptions.map(item => ({
    topic: item.topic,
    totalMessages: 0,
    isSubscribed: false,
    hasNewMessages: false,
    newMessagesCount: 0,
  }));

  return (
    <TopicsList
      itemComponent={item => <TopicsListItem topicData={item} />}
      items={badApiAdaptationTopicsFixMePlease}
      title=""
    />
  );
};

Subscriptions.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withGetData(Subscriptions, 'api/subscriptions');
