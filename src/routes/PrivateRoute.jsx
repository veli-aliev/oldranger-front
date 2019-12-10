import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isLogin, path, component: Component }) => (
  <Route path={path}>{isLogin ? <Component /> : <Redirect to="/" />}</Route>
);

PrivateRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
