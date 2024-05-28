import { UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import { FC, useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export const UserMenu: FC = () => {
	const { logout, userInfo } = useContext(AuthContext);

	return (
		<Menu
			mode="horizontal"
			items={[
				{
					key: "sub4",
					label: `${userInfo?.firstName} ${userInfo?.lastName}`,
					icon: (
						<Avatar
							style={{ marginLeft: 8, backgroundColor: "#87d068" }}
							icon={<UserOutlined />}
						/>
					),
					children: [{ key: "signOut", label: "Sign Out", onClick: logout }],
				},
			]}
		/>
	);
};
