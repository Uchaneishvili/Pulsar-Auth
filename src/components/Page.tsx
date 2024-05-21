import { CSSProperties, FC } from "react";

type PageProps = {
	style?: CSSProperties;
	children?: React.ReactNode;
};

const Page: FC<PageProps> = ({ style, children }) => {
	return (
		<div className="page-wrapper" style={style}>
			{children}
		</div>
	);
};
export default Page;
