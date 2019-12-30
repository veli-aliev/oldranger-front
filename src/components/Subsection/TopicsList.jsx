import React from 'react';
import PropTypes from 'prop-types';
import { List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { StyledList, StyledTitle } from '../Main/styled';

const TopicsList = ({ title, items, itemComponent, fetchMessages, hasMore }) => {
  return items.length > 0 ? (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMessages}
      hasMore={hasMore}
      loader={<Spin />}
    >
      <StyledList
        header={<StyledTitle>{title}</StyledTitle>}
        dataSource={items}
        renderItem={item => <List.Item>{itemComponent(item)}</List.Item>}
        size="large"
      />
    </InfiniteScroll>
  ) : (
    <Spin />
  );
};

TopicsList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  itemComponent: PropTypes.func.isRequired,
  fetchMessages: PropTypes.func,
  hasMore: PropTypes.bool,
};

TopicsList.defaultProps = {
  title: <h1>No Title</h1>,
  hasMore: false,
  fetchMessages: () => {},
};

export default TopicsList;
