import styles from './index.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const MENU = [
	{
		"children": [],
		"name": "主页",
		"popup": 0,
		"url": "#/skuunit"
	}
];


class Header extends Component {
	static navHashMap = {
		'skuunit': [],
		'skuset': []
	};

	getMenu() {
		return MENU.map((menu, index) => {
			let { url, name, popup, bpm } = menu;

			if (name != '首页') {
				url = url.replace(/#\/?/, '#/');
			}

			//获取菜单的hash值
			const hash = url.replace(/^#\//, '');
			const props = {};
			if (popup === 1) {
				props.target = '_blank';
			}

			//获取当前location的hash值
			const currentHash = window.location.hash;

			if (this.matchNavHash(hash)) {
				props.className = styles["active"];
			}
			return <li key={index}><a href={url} {...props} >{name}</a></li>
		});
	}

	matchNavHash(hash) {
		const currentHash = window.location.hash;
		if (currentHash && currentHash.indexOf(hash) == 2) {
			return true;
		}

		const mappedHashs = Header.navHashMap[hash];

		if (mappedHashs && mappedHashs.length) {
			let matched = false;
			for (let i = 0; i < mappedHashs.length; i++) {
				if (currentHash.indexOf(mappedHashs[i]) == 2) {
					matched = true;
					break;
				}
			}
			return matched;
		}
		return false;
	}

	render() {

		return (
			<div className={styles["main-nav"]}>
				<div className={styles["logo"]}></div>
				<ul className={styles["nav-list-ul"]} >
					{this.getMenu()}
				</ul>
				<ul className={styles["state-info"]}>
					<li >
						<span className={styles["user-info"]}>Hello, this is a react App.</span>
					</li>
					<li><a data-role="logout"><i className="iconfont icon-lgout"></i></a></li>
				</ul>
			</div>
		)
	}
}

export default Header;