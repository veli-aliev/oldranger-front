import React from 'react';
import PropTypes from 'prop-types';
import { List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { StyledList, StyledTitle } from '../Main/styled';

const TopicsList = ({
  title,
  items,
  itemComponent,
  fetchMessages,
  inProgress,
  hasMore,
  hasChildren,
}) => {
  return inProgress ? (
    <Spin />
  ) : (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMessages}
      hasMore={hasMore}
      loader={<Spin />}
      hasChildren={hasChildren}
      endMessage={
        fetchMessages !== null ? (
          <p style={{ textAlign: 'center' }}>
            <b>Вы все просмотрели!</b>
          </p>
        ) : null
      }
    >
      <StyledList
        header={title && <StyledTitle>{title}</StyledTitle>}
        dataSource={items}
        renderItem={item => <List.Item>{itemComponent(item)}</List.Item>}
        size="large"
      />
    </InfiniteScroll>
  );
};

TopicsList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  itemComponent: PropTypes.func.isRequired,
  fetchMessages: PropTypes.func,
  hasMore: PropTypes.bool,
  hasChildren: PropTypes.bool,
  inProgress: PropTypes.bool,
};

TopicsList.defaultProps = {
  title: <h1>No Title</h1>,
  hasMore: false,
  fetchMessages: null,
  hasChildren: true,
  inProgress: true,
};

export default TopicsList;
