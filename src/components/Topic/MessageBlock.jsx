import React from 'react';
import PropTypes from 'prop-types';

const MessageBlock = ({ messageBody }) => {
  return <div>{messageBody}</div>;
};

MessageBlock.propTypes = {
  messageBody: PropTypes.string.isRequired,
};

export default MessageBlock;
