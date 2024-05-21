import { FC, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Table } from "antd";
import Page from "../../components/Page";
import Bread from "../../components/Bread";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "../../apis/queries/userQueries";

const Users: FC = () => {
	const { userInfo } = useContext(AuthContext);
	console.log("sd", userInfo);
	const { loading, error, data, fetchMore } = useQuery(GET_USERS, {
		variables: {
			page: 1, // Set the initial page number
		},
	});

	const routes = [
		{
			path: "",
			breadcrumbName: "Users",
		},
	];

	console.log();

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
			title: "count",
			dataIndex: "signInCount",
			key: "signInCount",
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			key: "createdAt",
		},
	];

	return (
		<>
			<Bread routes={routes} />

			<Page>
				<Table
					columns={columns}
					dataSource={data?.getUsers.nodes || []}
					rowKey={(record) => record.id}
				/>
			</Page>
		</>
	);
};
export default Users;
