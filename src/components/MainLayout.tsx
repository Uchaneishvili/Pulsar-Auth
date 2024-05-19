import { Layout } from "antd";
import { FC, useContext, useEffect } from "react";
import { AppRoutes } from "../AppRoutes";
import AuthContext from "../contexts/AuthContext";
import PageHeader from "./PageHeader";

const MainLayout: FC = () => {
	const { loadUserInfo } = useContext(AuthContext);

	useEffect(() => {
		const run = async () => {
			try {
				await loadUserInfo();
			} catch (err) {
				window.location.href = "/login";
			}
		};
		run();
	}, [loadUserInfo]);

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Layout style={{ marginLeft: 250 }}>
				<PageHeader />
				<AppRoutes />
			</Layout>
		</Layout>
	);
};

export default MainLayout;
