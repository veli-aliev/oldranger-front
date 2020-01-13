import React from 'react';
import PropTypes from 'prop-types';
import { Row, Spin } from 'antd';

import { withGetData } from '../hoc';
import TopicsList from '../Subsection/TopicsList';
import TopicsListItem from '../Subsection/TopicsListItem';

const Themes = ({ isLoading, data: themes }) => {
  if (isLoading) {
    return <Spin />;
  }

  if (themes.length === 0) {
    return (
      <Row type="flex" justify="center">
        <h4>Тем нет</h4>
      </Row>
    );
  }

  const badApiAdaptationTopicsFixMePlease = themes.map(topic => ({
    topic,
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

Themes.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withGetData(Themes, 'api/topics');
