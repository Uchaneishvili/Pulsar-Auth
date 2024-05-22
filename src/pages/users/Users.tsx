import { FC, useState } from "react";
import { Table } from "antd";
import Page from "../../components/Page";
import Bread from "../../components/Bread";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../apis/queries/userQueries";
import FormatData from "../../utils/FormatData";

const Users: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const { loading, data } = useQuery(GET_USERS, {
		variables: {
			page: currentPage, // Set the initial page number
		},
	});

	const routes = [
		{
			path: "",
			breadcrumbName: "Users",
		},
	];

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

			<Page>
				<Table
					loading={loading}
					columns={columns}
					dataSource={data?.getUsers.nodes || []}
					rowKey={(record) => record.id}
					pagination={{
						current: currentPage,
						total: data?.getUsers.totalCount,
						pageSize: 10, // Number of records per page
						onChange: handlePageChange,
					}}
				/>
			</Page>
		</>
	);
};
export default Users;