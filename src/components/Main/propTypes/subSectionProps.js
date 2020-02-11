import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  position: PropTypes.number,
  section: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    position: PropTypes.number,
    hideToAnon: PropTypes.bool,
  }),
  hideToAnon: PropTypes.bool,
});
