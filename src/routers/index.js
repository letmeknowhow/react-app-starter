/*
   Root, Router 配置
*/
import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { Spin } from 'antd';

import AsyncLoad from './AsyncLoad';
import { Header, Footer } from 'component';
import UserErrorHandler from './UserErrorHandler';

import { connect } from 'react-redux';

const Skuunit = AsyncLoad({ loader: () => import(/* webpackChunkName: "home" */ './Skuunit') });

const Root = (props) => {
  const { location, history, match } = props;
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={Skuunit} />
        <Route render={() => <Redirect to="/home" />} />
      </Switch>
      <Footer />
      <UserErrorHandler />
    </div>
  )
};

export default hot(module)(withRouter(Root));
