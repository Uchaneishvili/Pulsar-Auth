import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AuthLocal from "../utils/Auth";

const httpLink = createHttpLink({
	uri: "http://localhost:5000/graphql",
	credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
	const token = AuthLocal.getToken();
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: from([authLink, httpLink]),
	cache: new InMemoryCache(),
});

export default client;