import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileData from './ProfileData';
import queries from '../../serverQueries/index';

const ProfileAnotherUser = props => {
  const { match } = props;
  const { id } = match.params;
  const [user, setUser] = useState({});

  useEffect(() => {
    queries.getAnotherUserData(id).then(el => {
      setUser(el);
    });
  }, []);
  return <ProfileData user={user} id={id} />;
};

ProfileAnotherUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

ProfileAnotherUser.defaultProps = {
  match: { params: { id: null } },
};

export default withRouter(ProfileAnotherUser);
