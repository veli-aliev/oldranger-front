import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ChatRoute = ({ isLogin, user, path, component: Component }) => (
  <Route path={path}>{isLogin ? <Component user={user} /> : <Redirect to="/login" />}</Route>
);

export default ChatRoute;

ChatRoute.propTypes = {
  user: PropTypes.shape({
    nickName: PropTypes.string,
  }),
  isLogin: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
};

ChatRoute.defaultProps = {
  user: {},
};
