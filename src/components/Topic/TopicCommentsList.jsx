import React from 'react';
import { List, Spin } from 'antd';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import TopicCommentItem from './TopicCommentItem';
import commentProps from './propTypes/commentProps';

const TopicCommentsList = ({ messages, loadMore, hasMore }) => {
  return (
    <InfiniteScroll
      dataLength={messages.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<Spin />}
    >
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={item => <TopicCommentItem comment={item} />}
      />
    </InfiniteScroll>
  );
};

TopicCommentsList.propTypes = {
  messages: PropTypes.arrayOf(commentProps).isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool,
};

TopicCommentsList.defaultProps = {
  hasMore: false,
};

export default TopicCommentsList;
