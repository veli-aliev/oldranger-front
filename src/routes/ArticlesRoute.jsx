import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Articles from '../components/Articles/Articles';
import ArticlesByTag from '../components/Articles/ArticlesByTag';
import ArticleCreate from '../components/Articles/ArticleCreate';

const ArticlesRoute = ({ isLogin }) => {
  return (
    <>
      <Route>
        {isLogin ? (
          <Switch>
            <Route exact path="/articles">
              <Articles />
            </Route>
            <Route exact path="/articles/:articleTag">
              <ArticlesByTag />
            </Route>
            <Route exact path="/articleCreate">
              <ArticleCreate />
            </Route>
          </Switch>
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
    </>
  );
};

ArticlesRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default ArticlesRoute;
