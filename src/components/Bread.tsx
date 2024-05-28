import React, { FC } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

interface RouteItem {
	path: string;
	breadcrumbName: string;
}
interface IBreadProp {
	routes: RouteItem[];
}

const Bread: FC<IBreadProp> = (prop) => {
	const extraBreadcrumbItems = prop.routes.map((row: any, index: number) => {
		const last = prop.routes.length === index + 1;
		return {
			title: row.breadcrumbName,
			path: last ? undefined : row.path,
			key: row.path,
			...(last
				? {}
				: { overlay: <Link to={row.path}>{row.breadcrumbName}</Link> }),
		};
	});

	return (
		<div className="breadCrumb">
			<Breadcrumb
				items={[
					{
						key: "Home",
						href: "/",
						title: <HomeOutlined />,
					},
					...extraBreadcrumbItems,
				]}
			/>
		</div>
	);
};

export default Bread;
