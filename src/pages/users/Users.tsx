import { FC, useContext, useEffect, useState } from "react";
import { Table } from "antd";
import Page from "../../components/Page";
import Bread from "../../components/Bread";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../apis/queries/userQueries";
import FormatData from "../../utils/FormatData";
import Card from "../../components/ui/card/Card";
import AuthContext from "../../contexts/AuthContext";

const Users: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { loading, data, refetch } = useQuery(GET_USERS, {
		variables: { page: currentPage },
	});
	const { userInfo } = useContext(AuthContext);
	useEffect(() => {
		const socket = new WebSocket("ws://localhost:8080");
		socket.onopen = () => {
			console.log("WebSocket connection opened");
		};
		socket.onmessage = (event) => {
			refetch();
		};
		socket.onclose = () => {
			console.log("WebSocket connection closed");
		};
		socket.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		return () => {
			socket.close();
		};
	}, [refetch]);

	const routes = [{ path: "", breadcrumbName: "Users" }];

	const columns = [
		{
			title: "User Name",
			dataIndex: "userName",
			key: "userName",
		},
		{
			title: "First Name",
			dataIndex: "firstName",
			key: "firstName",
		},
		{
			title: "Last Name",
			dataIndex: "lastName",
			key: "lastName",
		},
		{
			title: "Sign-in Count",
			dataIndex: "successedSignInCount",
			key: "successedSignInCount",
		},
		{
			title: "Created Date",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (val: string) => {
				return FormatData.formatDateTime(val);
			},
		},
	];

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<>
			<Bread routes={routes} />
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					padding: "20px",
				}}
			>
				<Card
					title={"Personal Sign-in Count"}
					value={userInfo?.successedSignInCount || 0}
				/>
				<Card
					title={"Global Sign-in Count"}
					value={data?.getUsers.totalSignInCount || 0}
				/>
			</div>
			<Page>
				<Table
					loading={loading}
					columns={columns}
					dataSource={data?.getUsers.nodes}
					rowKey={(record) => record.id}
					pagination={{
						current: currentPage,
						total: data?.getUsers.totalCount,
						pageSize: 5,
						onChange: handlePageChange,
					}}
				/>
			</Page>
		</>
	);
};

export default Users;
