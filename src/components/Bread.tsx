import React, { FC } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

interface IBreadProp {
	routes: any[];
}

const Bread: FC<IBreadProp> = (prop) => {
	const extraBreadcrumbItems = prop.routes.map((row: any, index: number) => {
		const last = prop.routes.length === index + 1;
		return last ? (
			<Breadcrumb.Item key={row.path}>{row.breadcrumbName}</Breadcrumb.Item>
		) : (
			<Breadcrumb.Item key={row.path}>
				<Link to={row.path}>{row.breadcrumbName}</Link>
			</Breadcrumb.Item>
		);
	});
	const breadcrumbItems = [
		<Breadcrumb.Item key="home">
			<Link to="/">
				<HomeOutlined />
			</Link>
		</Breadcrumb.Item>,
	].concat(extraBreadcrumbItems);
	return (
		<div className="breadCrumb">
			<Breadcrumb>{breadcrumbItems}</Breadcrumb>
		</div>
	);
};
export default Bread;
