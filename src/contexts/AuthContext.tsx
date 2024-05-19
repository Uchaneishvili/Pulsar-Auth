import React, { memo, useState } from "react";
import RequestHelper from "../apis/RequestHelper";
import {
	ILoginInput,
	ILoginResult,
	IRegisterInput,
	IUser,
} from "../types/user";
import AuthLocal from "../utils/Auth";

interface IAuthContext {
	userInfo: IUser | null;
	loadUserInfo: () => Promise<void>;
	login: (_: ILoginInput) => Promise<boolean>;
	logout: () => Promise<void>;
	register: (_: IRegisterInput) => Promise<boolean>;
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
	register: async (_: IRegisterInput): Promise<boolean> => {
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
		loadUserInfo: async () => {
			const res = await RequestHelper.auth.get("/users/me/details", {
				withCredentials: true,
			});
			const userInfo = res.data.data;

			setState((s) => ({
				...s,
				userInfo,
			}));

			AuthLocal.setUserInfo(userInfo);
		},
		logout: async () => {
			try {
				await RequestHelper.auth.get("/users/logout/current", {
					withCredentials: true,
				});
			} catch (err) {
				console.log(err);
			}

			AuthLocal.deauthenticateUser();
			state.setUserInfo(null);
		},
		login: async (input: ILoginInput) => {
			const res = await RequestHelper.auth.post(
				"/users/login",
				{
					userName: input.userName,
					password: input.password,
				},
				{
					withCredentials: true,
				}
			);

			if (res.data && res.data.data) {
				const { token, user } = res.data.data as ILoginResult;
				if (!token || !user) {
					return false;
				}

				AuthLocal.setToken(token);
				AuthLocal.updatLastTokenRefreshTime();

				state.setUserInfo(user);
				return true;
			}

			return false;
		},

		register: async (input: IRegisterInput) => {
			const res = await RequestHelper.auth.post(
				"/users/register",
				{
					firstName: input.firstName,
					lastName: input.lastName,
					userName: input.userName,
					password: input.password,
				},
				{
					withCredentials: true,
				}
			);

			if (res.data && res.data.data) {
				const { token, user } = res.data.data as ILoginResult;
				if (!token || !user) {
					return false;
				}

				AuthLocal.setToken(token);
				AuthLocal.updatLastTokenRefreshTime();

				state.setUserInfo(user);
				return true;
			}

			return false;
		},
	});

	return (
		<AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
	);
});

export default AuthContext;
