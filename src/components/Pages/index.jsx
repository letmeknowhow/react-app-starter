/**
 * class: Pages
 * author: niuxiaoyu
 * description: 基于antd的Pagination实现的分页组件
 * date: 2018/1/23
 */
import styles from './index.css';
import React, { Component } from 'react';
import { Pagination } from 'antd';

export default ({
	pageSizeOptions = ['20', '50', '100', '200', '300'],
	total = 0,
	current = 1,
	pageSize = 50,
	loadTable,
}) => {
	const onShowSizeChange = (pageNo, size) => {
		reloadTable(1, size);
	}

	const onChange = (pageNo, size) => {
		reloadTable(pageNo, size);
	}

	const reloadTable = (pageNo, size) => {
		loadTable && loadTable('page', {
			'pageSize': size,
			'pageNo': pageNo,
		});
	}

	return (
		total ?
			<div className={styles["wrap-box"]}>
				<div className={styles["page-wrap"]}>
					<div className={styles["page-l-wrap"]}>
						<span className={styles["mt"]}>每页显示：</span>
					</div>
					<div className={styles["page-r-wrap"]}>
						<Pagination
							showQuickJumper
							showSizeChanger
							pageSizeOptions={pageSizeOptions}
							showTotal={(total, range) => `共${Math.ceil(total / pageSize)}页 共${total}条`}
							current={current}
							pageSize={pageSize}
							total={total}
							onShowSizeChange={onShowSizeChange}
							onChange={onChange}
						/>
					</div>
				</div>
			</div> : null
	);
}