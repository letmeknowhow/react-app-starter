/**
 *  Class: About
 *  Author: Niu Xiaoyu
 *  Date: 16/2/16.
 *  Description: 关于页
 */
import React, {Component} from 'react';
import {Link} from 'react-router';

import {Header, Footer, Loading} from './common/index';
import pic1 from '../assets/1.png';


class About extends Component {
  render() {
    return (
      <div>
        <Header leftIcon="fanhui" title="关于"/>
        <div className="about">
          <div className="saoma">
            <div className="pictrue"><img src={pic1}/></div>
          </div>


        </div>
      </div>
    );
  }
}
;


export default About;