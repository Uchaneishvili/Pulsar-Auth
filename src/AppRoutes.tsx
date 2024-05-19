import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};
