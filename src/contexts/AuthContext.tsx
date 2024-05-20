import React, { memo, useState } from "react";
import { useMutation } from "@apollo/client";
import {
	LOGIN_MUTATION,
	REGISTER_MUTATION,
} from "../apis/mutations/authMutations";
import { ILoginInput, UserInput, IUser } from "../types/user";
import AuthLocal from "../utils/Auth";

interface IAuthContext {
	userInfo: IUser | null;
	loadUserInfo: () => Promise<void>;
	login: (input: ILoginInput) => Promise<boolean>;
	logout: () => Promise<void>;
	register: (input: UserInput) => Promise<boolean>;
	setUserInfo: (user: IUser | null) => void;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const initialState: IAuthContext = {
	userInfo: null,
	loadUserInfo: async () => {},
	setUserInfo: (_: IUser | null) => {},
	logout: async () => {},
	login: async (_: ILoginInput): Promise<boolean> => {
		return false;
	},
	register: async (_: UserInput): Promise<boolean> => {
		return false;
	},
};

export const AuthContext = React.createContext<IAuthContext>(initialState);

export const AuthProvider = memo((props: AuthProviderProps) => {
	const [state, setState] = useState<IAuthContext>({
		...initialState,
		userInfo: AuthLocal.getUserInfo(),
		setUserInfo: (user: IUser | null) => {
			AuthLocal.setUserInfo(user);
			setState((s) => ({ ...s, userInfo: user }));
		},
		loadUserInfo: async () => {},
		logout: async () => {
			AuthLocal.deauthenticateUser();
			state.setUserInfo(null);
		},
		login: async (input: ILoginInput) => {
			const res = await login({ variables: { input } });
			if (res.errors && res.errors.length) {
				console.error("Error logging in:", res.errors[0].message);
				return false;
			} else if (res.data) {
				const { token, user } = res.data.login;
				if (!token || !user) {
					return false;
				}
				AuthLocal.setToken(token);
				AuthLocal.updateLastTokenRefreshTime();
				state.setUserInfo(user);
				return true;
			}
			return false;
		},
		register: async (input: UserInput) => {
			const res = await register({ variables: { input } });
			if (res.errors && res.errors.length) {
				console.error("Error registering:", res.errors[0].message);
				return false;
			} else if (res.data) {
				const { token, user } = res.data.register;
				if (!token || !user) {
					return false;
				}
				AuthLocal.setToken(token);
				AuthLocal.updateLastTokenRefreshTime();
				state.setUserInfo(user);
				return true;
			}
			return false;
		},
	});

	const [login] = useMutation(LOGIN_MUTATION);
	const [register] = useMutation(REGISTER_MUTATION);

	return (
		<AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
	);
});

export default AuthContext;
