import React from 'react';
import 'antd/dist/antd.css';

import queries from './serverQueries';
import {
  PrivateRoute,
  CommonRoute,
  AuthRoute,
  TopicRoute,
  SubsectionRoute,
  SearchRoute,
  ArticlesRoute,
  ChatRoute,
} from './routes';
import Context from './components/Context';
import Header from './components/layouts/Header';
import Profile from './components/Profile';
import ChatAuth from './components/Chat/ChatAuth';
import AdminPanel from './components/AdminPanel';

class App extends React.Component {
  constructor(props) {
    super(props);
    let initialState = { user: {}, isLogin: false };
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || {});
      initialState = {
        user,
        isLogin: true,
      };
    }
    this.state = { ...initialState };
  }

  changeLoginState = () => {
    this.setState(({ isLogin }) => ({
      isLogin: !isLogin,
    }));
  };

  changeUserState = data => {
    this.setState({ user: { ...data } });
  };

  logOut = async () => {
    localStorage.removeItem('user');
    queries.logOut();
    this.setState({ isLogin: false, user: {} });
  };

  render() {
    const {
      isLogin,
      user: { role },
      user,
    } = this.state;
    return (
      <Context.Provider
        value={{
          changeUserState: this.changeUserState,
          changeLoginState: this.changeLoginState,
          logOut: this.logOut,
          ...this.state,
        }}
      >
        <Header />
        <CommonRoute />
        <AuthRoute isLogin={isLogin} />
        <PrivateRoute isAllowed={isLogin} path="/profile" component={Profile} />
        <PrivateRoute
          isAllowed={isLogin && role === 'ROLE_ADMIN'}
          path="/admin-panel"
          component={AdminPanel}
        />
        <TopicRoute isLogin={isLogin} />
        <SubsectionRoute />
        <SearchRoute />
        <ArticlesRoute isLogin={isLogin} role={role} />
        {/* TODO delete eslint disable */}
        {/* eslint-disable-next-line no-undef */}
        <ChatRoute path="/chat" isLogin={isLogin} user={user} component={ChatAuth} />
      </Context.Provider>
    );
  }
}

export default App;
