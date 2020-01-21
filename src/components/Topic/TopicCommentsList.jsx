import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import commentProps from './propTypes/commentProps';
import { StyledList, StyledTitle } from '../Main/styled';

const TopicCommentsList = ({ messages, itemComponent, title, changePageHandler, total, page }) => {
  return messages.length > 0 ? (
    <StyledList
      className="comment-list"
      header={<StyledTitle>{title}</StyledTitle>}
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={itemComponent}
      pagination={{
        current: page,
        onChange: currentPage => {
          changePageHandler(currentPage);
        },
        pageSize: 10,
        total,
      }}
    />
  ) : (
    <Spin />
  );
};

TopicCommentsList.propTypes = {
  messages: PropTypes.arrayOf(commentProps).isRequired,
  itemComponent: PropTypes.func.isRequired,
  title: PropTypes.string,
  changePageHandler: PropTypes.func,
  total: PropTypes.number,
  page: PropTypes.number,
};

TopicCommentsList.defaultProps = {
  title: 'No Title',
  total: 1,
  page: 1,
  changePageHandler: () => {},
};

export default TopicCommentsList;
