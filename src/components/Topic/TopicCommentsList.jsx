import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import commentProps from './propTypes/commentProps';
import { StyledList, StyledTitle } from '../Main/styled';

const TopicCommentsList = ({ messages, itemComponent, title, changePageHandler, total }) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  const [page, setPage] = useState(parseInt(query.get('page'), 10));
  return messages.length > 0 ? (
    <StyledList
      header={<StyledTitle>{title}</StyledTitle>}
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={itemComponent}
      pagination={{
        current: page,
        // defaultCurrent: page,
        onChange: currentPage => {
          changePageHandler(currentPage);
          setPage(currentPage);
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
  changePageHandler: PropTypes.func.isRequired,
  total: PropTypes.number,
};

TopicCommentsList.defaultProps = {
  title: 'No Title',
  total: 1,
};

export default TopicCommentsList;
