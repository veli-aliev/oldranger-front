import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { StyledSearchCommentItem } from './styled';
import TopicCommentItem from '../Topic/TopicCommentItem';
import commentProps from '../Topic/propTypes/commentProps';

const SearchCommentsItem = ({ item, history }) => {
  const commentClickHandler = () => {
    history.push(`/topic/${item.topicId}#comment${item.positionInTopic}`);
  };

  return (
    <StyledSearchCommentItem onClick={commentClickHandler}>
      <b>Здесь будет название топика, а пока его ID {item.topicId}</b>
      <TopicCommentItem comment={item} />
    </StyledSearchCommentItem>
  );
};

SearchCommentsItem.propTypes = {
  item: commentProps.isRequired,
  history: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default withRouter(SearchCommentsItem);
