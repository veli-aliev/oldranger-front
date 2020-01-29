import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import Login from '../components/Login';
import Registration from '../components/Registration';

const AuthRoute = ({ isLogin }) => (
  <>
    <Route path="/registration/:key">{isLogin ? <Redirect to="/" /> : <Registration />}</Route>
    <Route path="/login">{isLogin ? <Redirect to="/" /> : <Login />}</Route>
  </>
);

AuthRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default AuthRoute;
