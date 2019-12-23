import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TopicCommentItem from '../Topic/TopicCommentItem';
import commentProps from '../Topic/propTypes/commentProps';
import ClickableItemWrapper from '../Subsection/ClickableItemWrapper';

const SearchCommentsItem = ({ item, history }) => {
  const commentClickHandler = () => {
    history.push(`/topic/${item.topicId}#comment${item.positionInTopic}`);
  };

  return (
    <ClickableItemWrapper clickHandler={commentClickHandler}>
      <>
        <b>Здесь будет название топика, а пока его ID {item.topicId}</b>
        <TopicCommentItem comment={item} />
      </>
    </ClickableItemWrapper>
  );
};

SearchCommentsItem.propTypes = {
  item: commentProps.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(SearchCommentsItem);
