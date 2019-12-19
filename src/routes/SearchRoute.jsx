import React from 'react';
import { Route } from 'react-router-dom';
import SearchTopicsPage from '../components/Search/SearchTopicsPage';
import SearchCommentsPage from '../components/Search/SearchCommentsPage';

const SearchRoute = () => (
  <>
    <Route exact path="/searchTopics/:searchRequest">
      <SearchTopicsPage />
    </Route>
    <Route exact path="/searchComments/:searchRequest">
      <SearchCommentsPage />
    </Route>
  </>
);

export default SearchRoute;
