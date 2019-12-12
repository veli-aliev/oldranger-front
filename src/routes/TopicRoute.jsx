import React from 'react';
import { Route } from 'react-router-dom';
import TopicPage from '../components/Topic/TopicPage';

const TopicRoute = () => (
  <Route exact path="/topic/:topicId">
    <TopicPage />
  </Route>
);

export default TopicRoute;
