import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import "../App.css";

const { Sider } = Layout;

export const Sidebar = () => {
	const triggerPageWidth = () => {
		const contextWrapper = document.getElementById("contextWrapper");
		if (contextWrapper) {
			const size =
				contextWrapper.style.marginLeft === "250px" ? "80px" : "250px";
			contextWrapper.style.marginLeft = size;
		}
	};
	const onCollapse = (collapsed: any) => {
		collapsed
			? setTimeout(() => {
					triggerPageWidth();
			  }, 500)
			: triggerPageWidth();
	};

	const navClassName = ({ isActive }: { isActive: boolean }) =>
		"nav-link" + (isActive ? " activated" : "");

	return (
		<>
			<Sider
				width="250px"
				onCollapse={onCollapse}
				style={{
					overflow: "auto",
					height: "100vh",
					position: "fixed",
					left: 0,
				}}
				collapsible
			>
				<div className="logo"></div>
				<Menu theme="dark" mode="inline">
					<Menu.Item key="home" icon={<HomeOutlined />}>
						<NavLink end to="/" className={navClassName}>
							Home
						</NavLink>
					</Menu.Item>
					<Menu.Item key="users" icon={<UserOutlined />}>
						<NavLink end to="/users" className={navClassName}>
							Users
						</NavLink>
					</Menu.Item>
				</Menu>
			</Sider>
		</>
	);
};
