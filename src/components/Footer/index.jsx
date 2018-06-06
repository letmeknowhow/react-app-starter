import React, { Component } from 'react'
import styles from './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div id="twilight-footer" className={styles["footer"]}>
        <p>© 2018 BIZ.COM 京IPC证XXXXXX号</p>
      </div>
    )
  }
}

export default Footer;
