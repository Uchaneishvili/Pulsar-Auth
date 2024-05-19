import { useLocation } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./AppRoutes";
import MainLayout from "./components/MainLayout";

const App: React.FC = () => {
	const location = useLocation();

	const getLoginLayout = () => {
		return <AppRoutes />;
	};

	return (
		<AuthProvider>
			<AppProvider>
				{location.pathname === "/login" ? getLoginLayout() : <MainLayout />}
			</AppProvider>
		</AuthProvider>
	);
};

export default App;
