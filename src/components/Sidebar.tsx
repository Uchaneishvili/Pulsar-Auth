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

	const onCollapse = (collapsed: boolean) => {
		if (collapsed) {
			setTimeout(() => {
				triggerPageWidth();
			}, 500);
		} else {
			triggerPageWidth();
		}
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
				<Menu
					theme="dark"
					mode="inline"
					items={[
						{
							key: "home",
							icon: <HomeOutlined />,
							label: (
								<NavLink end to="/" className={navClassName}>
									Home
								</NavLink>
							),
						},
						{
							key: "users",
							icon: <UserOutlined />,
							label: (
								<NavLink end to="/users" className={navClassName}>
									Users
								</NavLink>
							),
						},
					]}
				/>
			</Sider>
		</>
	);
};
