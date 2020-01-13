import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import commentProps from './propTypes/commentProps';
import { StyledList, StyledTitle } from '../Main/styled';

const TopicCommentsList = ({ messages, hasMore, fetchMessages, itemComponent, title }) => {
  return messages.length > 0 ? (
    <InfiniteScroll
      dataLength={messages.length}
      next={fetchMessages}
      hasMore={hasMore}
      loader={<Spin />}
    >
      <StyledList
        header={title.length > 0 && <StyledTitle>{title}</StyledTitle>}
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={itemComponent}
      />
    </InfiniteScroll>
  ) : (
    <Spin />
  );
};

TopicCommentsList.propTypes = {
  fetchMessages: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(commentProps).isRequired,
  hasMore: PropTypes.bool,
  itemComponent: PropTypes.func.isRequired,
  title: PropTypes.string,
};

TopicCommentsList.defaultProps = {
  hasMore: false,
  title: 'No Title',
};

export default TopicCommentsList;
