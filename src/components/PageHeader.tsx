import { FC } from "react";
import { Layout } from "antd";
import { UserMenu } from "./UserMenu";

const PageHeader: FC = () => {
	return (
		<Layout.Header className="header">
			<div className="rightContainer">
				<div style={{ minWidth: 200 }}>
					<UserMenu />
				</div>
			</div>
		</Layout.Header>
	);
};
export default PageHeader;
