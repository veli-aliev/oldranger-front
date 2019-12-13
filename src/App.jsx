import React from 'react';
import 'antd/dist/antd.css';

import queries from './serverQueries';
import { PrivateRoute, CommonRoute, AuthRoute } from './routes';
import Context from './components/Context';
import Header from './components/layouts/Header';
import Profile from './components/Profile';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      user: {},
    };
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
    queries.logOut();
    this.setState(() => ({ isLogin: false, user: {} }));
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
        <>
          <CommonRoute />
          <AuthRoute isLogin={isLogin} />
          <PrivateRoute isLogin={isLogin} path="/profile" component={Profile} />
        </>
      </Context.Provider>
    );
  }
}

export default App;
