import { Layout } from "antd";
import { FC, useContext, useEffect } from "react";
import { AppRoutes } from "../AppRoutes";
import AuthContext from "../contexts/AuthContext";
import PageHeader from "./PageHeader";
import { Sidebar } from "./Sidebar";

const MainLayout: FC = () => {
	const { loadUserInfo } = useContext(AuthContext);

	useEffect(() => {
		const run = async () => {
			const publicRoutes = ["/login", "/register"];

			if (!publicRoutes.includes(window.location.pathname)) {
				try {
					await loadUserInfo();
				} catch (err) {
					window.location.href = "/login";
				}
			}
		};
		run();
	}, [loadUserInfo]);

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar />

			<Layout id="contextWrapper" style={{ marginLeft: 250 }}>
				<PageHeader />
				<AppRoutes />
			</Layout>
		</Layout>
	);
};

export default MainLayout;
