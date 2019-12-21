import React from 'react';
import { List, Spin } from 'antd';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import commentProps from './propTypes/commentProps';

const TopicCommentsList = ({ messages, hasMore, fetchMessages, itemComponent }) => {
  return (
    <InfiniteScroll
      dataLength={messages.length}
      next={fetchMessages}
      hasMore={hasMore}
      loader={<Spin />}
    >
      <List itemLayout="horizontal" dataSource={messages} renderItem={itemComponent} />
    </InfiniteScroll>
  );
};

TopicCommentsList.propTypes = {
  fetchMessages: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(commentProps).isRequired,
  hasMore: PropTypes.bool,
  itemComponent: PropTypes.func.isRequired,
};

TopicCommentsList.defaultProps = {
  hasMore: false,
};

export default TopicCommentsList;
