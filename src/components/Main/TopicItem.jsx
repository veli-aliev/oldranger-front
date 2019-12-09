import React from 'react';
import { Link } from 'react-router-dom';
import topicProps from './propTypes/topicProps';

const TopicItem = ({ topicData }) => {
  return (
    <div>
      <Link to={`/topic/${topicData.id}`}>{topicData.name}</Link>
    </div>
  );
};

TopicItem.propTypes = {
  topicData: topicProps.isRequired,
};

export default TopicItem;
