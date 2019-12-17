import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from '../components/Main/MainPage';

const CommonRoute = () => <Route exact path="/" component={MainPage} />;

export default CommonRoute;
