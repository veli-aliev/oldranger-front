import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import TopicPage from '../components/Topic/TopicPage';
import TopicCreate from '../components/Topic/TopicCreate';
import PrivateRoute from './PrivateRoute';

const TopicRoute = ({ isLogin }) => (
  <Switch>
    <PrivateRoute isAllowed={isLogin} path="/topic/add" component={TopicCreate} />
    <Route exact path="/topic/:topicId">
      <TopicPage />
    </Route>
  </Switch>
);

TopicRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default TopicRoute;
