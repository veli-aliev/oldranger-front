import React from 'react';
import PropTypes from 'prop-types';
import { Row, Spin } from 'antd';
import TopicCommentsList from '../Topic/TopicCommentsList';
import TopicCommentItem from '../Topic/TopicCommentItem';

import { withGetData } from '../hoc';

const Messages = ({ isLoading, data: messages }) => {
  if (isLoading) {
    return <Spin />;
  }

  if (messages.length === 0) {
    return (
      <Row type="flex" justify="center">
        <h4>Сообщений нет</h4>
      </Row>
    );
  }

  return (
    <TopicCommentsList
      itemComponent={item => <TopicCommentItem comment={item} />}
      messages={messages}
      title=""
      fetchMessages={() => {}}
    />
  );
};

Messages.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withGetData(Messages, 'api/comments');
