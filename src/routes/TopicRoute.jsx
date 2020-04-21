import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userRoles } from '../constants';
import PrivateRoute from './PrivateRoute';
import TopicPage from '../components/Topic/TopicPage';
import TopicCreate from '../components/Topic/TopicCreate';
import TopicUpdate from '../components/Topic/TopicUpdate';

const TopicRoute = ({ isLogin, role }) => (
  <Switch>
    <Route exact path="/topic/add" render={props => <TopicCreate {...props} />} />
    <Route exact path="/topic/:topicId">
      <TopicPage />
    </Route>
    <PrivateRoute
      isAllowed={isLogin && role === userRoles.admin}
      exact
      path="/topic/:topicId/update"
      component={TopicUpdate}
    />
  </Switch>
);

TopicRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  role: PropTypes.string,
};

TopicRoute.defaultProps = {
  role: null,
};

export default TopicRoute;
