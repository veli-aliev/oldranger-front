import PropTypes from 'prop-types';
import userProps from './userProps';

export default PropTypes.shape({
  positionInTopic: PropTypes.number,
  topicId: PropTypes.number,
  author: userProps,
  commentDateTime: PropTypes.string,
  messageCount: PropTypes.number,
  replyDateTime: PropTypes.string,
  replyNick: PropTypes.string,
  replyText: PropTypes.string,
  commentText: PropTypes.string,
});
