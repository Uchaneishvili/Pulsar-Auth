import { FC, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const Home: FC = () => {
	const { userInfo } = useContext(AuthContext);
	console.log("sd", userInfo);
	return <>123</>;
};
export default Home;
