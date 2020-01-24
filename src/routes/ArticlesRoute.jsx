import React from 'react';
import { Route } from 'react-router-dom';
import Articles from '../components/Articles/Articles';
import ArticlesByTag from '../components/Articles/ArticlesByTag';
import ArticleCreate from '../components/Articles/ArticleCreate';

const ArticlesRoute = () => {
  return (
    <>
      <Route exact path="/articles">
        <Articles />
      </Route>
      <Route exact path="/articles/:ArticleTag">
        <ArticlesByTag />
      </Route>
      <Route exact path="/articleCreate">
        <ArticleCreate />
      </Route>
    </>
  );
};

export default ArticlesRoute;
