import PropTypes from 'prop-types';
import topicProps from './topicProps';

export default PropTypes.shape({
  section: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    position: PropTypes.number,
    hideToAnon: PropTypes.bool,
  }),
  topics: PropTypes.arrayOf(topicProps),
});
