import PropTypes from 'prop-types';
import subSectionProps from './subSectionProps';

export default PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  topicStarter: PropTypes.shape({
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
        authority: PropTypes.string,
      })
    ),
    accountNonExpired: PropTypes.bool,
    accountNonLocked: PropTypes.bool,
    credentialsNonExpired: PropTypes.bool,
  }),
  messageCount: PropTypes.number,
  startTime: PropTypes.string,
  lastMessageTime: PropTypes.string,
  subsection: subSectionProps,
  hideToAnon: PropTypes.bool,
  section: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    position: PropTypes.number,
    hideToAnon: PropTypes.bool,
  }),
});
