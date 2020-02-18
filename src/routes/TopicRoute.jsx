import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TopicPage from '../components/Topic/TopicPage';
import CreateTopic from '../components/Topic/CreateTopic';

const TopicRoute = () => (
  <Switch>
    <Route exact path="/topic/add">
      <CreateTopic />
    </Route>
    <Route exact path="/topic/:topicId">
      <TopicPage />
    </Route>
  </Switch>
);

export default TopicRoute;
