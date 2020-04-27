import React from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userRoles } from '../constants';
import Articles from '../components/Articles/Articles';
import PrivateRoute from './PrivateRoute';
import ArticleUpdate from '../components/Articles/ArticleUpdate';
import ArticlePage from '../components/Articles/ArticlePage';

const ArticlesRoute = ({ isLogin, role }) => {
  return (
    <>
      <Switch>
        <PrivateRoute isAllowed={isLogin} exact path="/articles" component={Articles} />
        <PrivateRoute
          isAllowed={isLogin}
          exact
          path="/article/:articleId"
          component={ArticlePage}
        />
        <PrivateRoute
          isAllowed={isLogin && role === userRoles.admin}
          exact
          path="/article/:articleId/update"
          component={ArticleUpdate}
        />
      </Switch>
    </>
  );
};

ArticlesRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  role: PropTypes.string,
};

ArticlesRoute.defaultProps = {
  role: null,
};

export default ArticlesRoute;
