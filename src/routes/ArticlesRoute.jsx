import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Articles from '../components/Articles/Articles';
import Login from '../components/Login';
import ArticleCreate from '../components/Articles/ArticleCreate';

const ArticlesRoute = ({ isLogin }) => {
  const isLoginArticlesComponent = isLogin ? Articles : Login;
  return (
    <>
      <Route exact path="/articles" component={isLoginArticlesComponent} />
      <Route path="/articleCreate">{isLogin ? <ArticleCreate /> : <Redirect to="/login" />}</Route>
    </>
  );
};

ArticlesRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default ArticlesRoute;
