import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';

import { PrivateRoute, CommonRoute, AuthRoute } from './routes';
import Context from './components/Context';
import Header from './components/layouts/Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  changeLoginState = () => {
    this.setState(({ isLogin }) => ({
      isLogin: !isLogin,
    }));
  };

  changeUserState = data => {
    this.setState({ ...data });
  };

  logOut = async () => {
    await axios.post('http://localhost:8888/logout');
    this.setState(() => ({ isLogin: false }));
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
          <PrivateRoute isLogin={isLogin} />
        </>
      </Context.Provider>
    );
  }
}

export default App;
