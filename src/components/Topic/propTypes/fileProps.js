import PropTypes from 'prop-types';

export default PropTypes.shape({
  uid: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.oneOf(['done', 'uploading', 'error', 'removed']),
  url: PropTypes.string,
});
