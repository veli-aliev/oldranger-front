import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  nickName: PropTypes.string,
  regDate: PropTypes.string,
  role: PropTypes.shape({
    id: PropTypes.number,
    role: PropTypes.string,
    authority: PropTypes.string,
  }),
  avatar: PropTypes.shape({
    id: PropTypes.number,
    original: PropTypes.string,
    medium: PropTypes.string,
    small: PropTypes.string,
  }),
  enabled: PropTypes.bool,
  username: PropTypes.string,
  authorities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      role: PropTypes.string,
      authority: PropTypes.string,
    })
  ),
  accountNonLocked: PropTypes.bool,
  hibernateLazyInitializer: PropTypes.objectOf(PropTypes.any),
  accountNonExpired: PropTypes.bool,
  credentialsNonExpired: PropTypes.bool,
});
