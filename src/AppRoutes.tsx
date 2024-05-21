import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import { RequireAuth } from "./utils/Auth";
import Users from "./pages/users/Users";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route
				path="/"
				element={
					<RequireAuth>
						<Home />
					</RequireAuth>
				}
			/>
			<Route
				path="/users"
				element={
					<RequireAuth>
						<Users />
					</RequireAuth>
				}
			/>
		</Routes>
	);
};
