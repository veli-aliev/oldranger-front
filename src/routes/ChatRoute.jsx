import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ChatRoute = ({ isLogin, user, path, component: Component }) => (
  <Route path={path}>{isLogin ? <Component user={user} /> : <Redirect to="/login" />}</Route>
);

ChatRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
};

export default ChatRoute;
