import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Articles from '../components/Articles/Articles';
import ArticlesByTag from '../components/Articles/ArticlesByTag';
import ArticleCreate from '../components/Articles/ArticleCreate';

const ArticlesRoute = ({ isLogin }) => {
  return (
    <>
      <Route exact path="/articles">
        {isLogin ? <Articles /> : <Redirect to="/login" />}
      </Route>
      <Route path="/articles/:articleTag">
        {isLogin ? <ArticlesByTag /> : <Redirect to="/login" />}
      </Route>
      <Route path="/articleCreate">{isLogin ? <ArticleCreate /> : <Redirect to="/login" />}</Route>
    </>
  );
};

ArticlesRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default ArticlesRoute;
