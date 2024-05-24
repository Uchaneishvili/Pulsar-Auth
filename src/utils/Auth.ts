import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { IUser } from "../types/user";

export function RequireAuth({ children }: { children: JSX.Element }) {
	const { userInfo } = useContext(AuthContext);
	let location = useLocation();
	const navigate = useNavigate();

	if (!userInfo || Object.keys(userInfo).length === 0) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		const redirectUrl =
			"/login?redirect=" +
			encodeURIComponent(location.pathname + location.search);
		navigate(redirectUrl, { replace: true });
		return null;
	}

	return children;
}

const TOKEN_KEY = "token";
const USER_INFO_KEY = "userInfo";
const LAST_TOKEN_REFRESH_TIME_KEY = "lastTokenRefreshTime";

class AuthLocal {
	static setToken(token: string | null) {
		if (!token) {
			AuthLocal.deauthenticateUser();
		}
		localStorage.setItem(TOKEN_KEY, token as string);
	}

	static refreshToken(): boolean {
		return !!localStorage.getItem(TOKEN_KEY);
	}

	static deauthenticateUser(): void {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(USER_INFO_KEY);
		localStorage.removeItem(LAST_TOKEN_REFRESH_TIME_KEY);
	}

	static getToken(): string | null {
		return localStorage.getItem(TOKEN_KEY);
	}

	static setUserInfo(userInfo: IUser | null) {
		if (!userInfo) {
			localStorage.removeItem(USER_INFO_KEY);
		} else {
			localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo || "{}"));
		}
	}

	static getUserInfo(): IUser | null {
		return JSON.parse(localStorage.getItem(USER_INFO_KEY) || "{}");
	}

	static updateLastTokenRefreshTime(): void {
		localStorage.setItem(
			LAST_TOKEN_REFRESH_TIME_KEY,
			new Date().getTime().toString()
		);
	}

	static getLastTokenRefreshTime(): number | null {
		const time = localStorage.getItem(LAST_TOKEN_REFRESH_TIME_KEY);
		return time ? +time : null;
	}
}

export default AuthLocal;
