import { useLocation } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./AppRoutes";
import MainLayout from "./components/MainLayout";
import client from "./apis/apollo-client"; // Import the Apollo Client instance
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloProvider } from "@apollo/client";

const App: React.FC = () => {
	// Adds messages only in a dev environment
	loadDevMessages();
	loadErrorMessages();
	const location = useLocation();

	const getLoginLayout = () => {
		return <AppRoutes />;
	};

	return (
		<>
			<ApolloProvider client={client}>
				<AuthProvider>
					<AppProvider>
						{location.pathname === "/login" ||
						location.pathname === "/register" ? (
							getLoginLayout()
						) : (
							<MainLayout />
						)}
					</AppProvider>
				</AuthProvider>
			</ApolloProvider>
		</>
	);
};

export default App;
