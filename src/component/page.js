/**
 *  Class: page
 *  Author: Niu Xiaoyu
 *  Date: 16/2/16.
 *  Description: 页面布局模板
 */

import React from 'react';
import '../css/page.less';

export default class Page extends React.Component {
  render() {
    const {title, subTitle, spacing, className, children} = this.props;

    return (
      <section className={`page ${className}`}>
        <div className="hd">
          <h1 className="title">{title}</h1>
          <p className="sub_title">{subTitle}</p>
        </div>
        <div className={`bd ${spacing ? 'spacing' : ''}`}>
          {children}
        </div>
      </section>
    );
  }
}