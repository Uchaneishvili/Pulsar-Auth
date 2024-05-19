import { UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { FC, Fragment, useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export const UserMenu: FC = () => {
	const { logout, userInfo } = useContext(AuthContext);
	return (
		<div>
			<Menu key="user" mode="horizontal">
				<SubMenu
					key="userName"
					title={
						<Fragment>
							<span>
								{userInfo?.firstName} {userInfo?.lastName}
							</span>
							<Avatar
								style={{ marginLeft: 8, backgroundColor: "#87d068" }}
								icon={<UserOutlined />}
							/>
						</Fragment>
					}
				>
					<Menu.Item key="SignOut" onClick={logout}>
						Sign out
					</Menu.Item>
				</SubMenu>
			</Menu>
		</div>
	);
};
