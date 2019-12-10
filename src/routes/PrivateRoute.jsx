import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import Profile from '../components/Profile';

const PrivateRoute = ({ isLogin }) => (
  <Route path="/profile">{isLogin ? <Profile /> : <Redirect to="/" />}</Route>
);

PrivateRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default PrivateRoute;
