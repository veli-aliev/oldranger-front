import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import Login from '../components/Login';
import Registration from '../components/Registration';
import RegistrationAccept from '../components/RegistrationAccept';

const AuthRoute = ({ isLogin }) => {
  return (
    <>
      <Route path="/invite">
        <Registration />
      </Route>
      <Route path="/registration-accept" component={RegistrationAccept} />
      <Route path="/login">{isLogin ? <Redirect to="/" /> : <Login />}</Route>
    </>
  );
};

AuthRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default AuthRoute;
