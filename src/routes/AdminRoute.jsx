import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../components/Context';
import { userRoles } from '../constants';

const AdminRoute = ({ path, children }) => {
  const {
    user: { role },
  } = useContext(UserContext);
  return <Route path={path}>{role === userRoles.admin ? children : <Redirect to="/" />}</Route>;
};

AdminRoute.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default AdminRoute;
