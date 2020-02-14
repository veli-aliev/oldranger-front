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
} from './routes';
import Context from './components/Context';
import Header from './components/layouts/Header';
import Profile from './components/Profile';
import SearchForm from './components/Main/SearchForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    let initialState = { user: {}, isLogin: false, userByRole: {} };
    if (localStorage.getItem('user')) {
      const userData = JSON.parse(localStorage.getItem('user') || {});
      initialState = {
        user: { ...userData.userProfile },
        isLogin: true,
        userByRole: { ...userData.userByRole },
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
    this.setState({ user: { ...data.userProfile }, userByRole: { ...data.userByRole } });
  };

  logOut = async () => {
    localStorage.removeItem('user');
    queries.logOut();
    this.setState(() => ({ isLogin: false, user: {}, userByRole: {} }));
  };

  render() {
    const { isLogin } = this.state;

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
        <SearchForm />
        <CommonRoute />
        <AuthRoute isLogin={isLogin} />
        <PrivateRoute isLogin={isLogin} path="/profile" component={Profile} />
        <TopicRoute />
        <SubsectionRoute />
        <SearchRoute />
        <ArticlesRoute />
      </Context.Provider>
    );
  }
}

export default App;
