import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TopicPage from '../components/Topic/TopicPage';
import TopicCreate from '../components/Topic/TopicCreate';

const TopicRoute = () => (
  <Switch>
    <Route exact path="/topic/add" render={props => <TopicCreate {...props} />} />
    <Route exact path="/topic/:topicId">
      <TopicPage />
    </Route>
  </Switch>
);

export default TopicRoute;
