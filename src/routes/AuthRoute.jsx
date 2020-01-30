import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import Login from '../components/Login';
import Registration from '../components/Registration';
import RegistrationAccept from '../components/RegistrationAccept';

const AuthRoute = ({ isLogin }) => {
  const regAcceptComponent = isLogin ? Redirect : RegistrationAccept;
  return (
    <>
      <Route path="/invite">{isLogin ? <Redirect to="/" /> : <Registration />}</Route>
      <Route path="/registration-accept" component={regAcceptComponent} />
      <Route path="/login">{isLogin ? <Redirect to="/" /> : <Login />}</Route>
    </>
  );
};

AuthRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default AuthRoute;
