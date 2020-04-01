import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAllowed, component: Component, ...rest }) => (
  <Route {...rest}>{isAllowed ? <Component /> : <Redirect to="/" />}</Route>
);

PrivateRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
