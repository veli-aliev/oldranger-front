import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Articles from '../components/Articles/Articles';
import ArticlesByTag from '../components/Articles/ArticlesByTag';
import ArticleCreate from '../components/Articles/ArticleCreate';
import AdminRoute from './AdminRoute';
import ArticleUpdate from '../components/Articles/ArticleUpdate';
import ArticlePage from '../components/Articles/ArticlePage';

const ArticlesRoute = ({ isLogin }) => {
  return (
    <>
      <Route>
        {isLogin ? (
          <Switch>
            <Route exact path="/articles">
              <Articles />
            </Route>
            <AdminRoute exact path="/article/create">
              <ArticleCreate />
            </AdminRoute>
            <Route exact path="/article/:articleId">
              <ArticlePage />
            </Route>
            <AdminRoute exact path="/article/:articleId/update">
              <ArticleUpdate />
            </AdminRoute>
            <Route exact path="/articles/:articleTag">
              <ArticlesByTag />
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
