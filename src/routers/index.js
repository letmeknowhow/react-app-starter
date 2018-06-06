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

const Skuunit = AsyncLoad({ loader: () => import(/* webpackChunkName: "skuunit" */ './Skuunit') });

const Root = (props) => {
  const { location, history, match } = props;
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/skuunit" component={Skuunit} />
        <Route render={() => <Redirect to="/skuunit" />} />
      </Switch>
      <Footer />
      <UserErrorHandler />
    </div>
  )
};

export default hot(module)(withRouter(Root));
