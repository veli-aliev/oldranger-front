import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/antd.css';

import Context from './components/Context';
import PrivateRoute from './PrivateRoute';
import Login from './components/Login';
import Registration from './components/Registration';

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
        <Switch>
          <Route path="/registration/:token">
            {isLogin ? <Redirect to="/" /> : <Registration />}
          </Route>
          <Route path="/login">{isLogin ? <Redirect to="/" /> : <Login />}</Route>
          <Route exact path="/" />
          <PrivateRoute isLogin={isLogin} />
        </Switch>
      </Context.Provider>
    );
  }
}

export default App;
