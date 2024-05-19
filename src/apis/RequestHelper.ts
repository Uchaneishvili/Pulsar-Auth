import axios, { AxiosInstance } from "axios";
import AuthLocal from "../utils/Auth";

export default class RequestHelper {
	public static AUTH_BASE_URL = process.env?.REACT_APP_AUTH_API;
	private static _auth: AxiosInstance | null;

	static get auth() {
		if (!this._auth) {
			this._auth = axios.create({
				baseURL: this.AUTH_BASE_URL,
				headers: {
					Authorization: `Bearer ${AuthLocal.getToken()}`,
				},
			});
			this.setInterceptor(this._auth);
		}
		return this._auth;
	}

	private static getAuthorization() {
		return `Bearer ${AuthLocal.getToken()}`;
	}
	private static setInterceptor(
		instance: AxiosInstance,
		catchResponse: boolean = true
	) {
		instance.interceptors.request.use((request): any => {
			return new Promise(async (resolve, reject) => {
				//Get fresh token in any way
				request.headers.Authorization = this.getAuthorization();

				const lastTokenRefreshTime = AuthLocal.getLastTokenRefreshTime();
				const expTime = 15 * 60 - 15; // minute, 15 minutes minus 15 second

				const allowedUrls = [
					"/users/login",
					"/users/refreshToken",
					"/users/register",
				];

				if (
					request.url &&
					allowedUrls.indexOf(request.url) === -1 &&
					(!lastTokenRefreshTime ||
						(new Date().getTime() - lastTokenRefreshTime) / 1000 >= expTime)
				) {
					try {
						const res = await RequestHelper.auth.post(
							"/users/refreshToken",
							{},
							{
								withCredentials: true,
							}
						);

						AuthLocal.setToken(res.data.data.token);
						AuthLocal.updatLastTokenRefreshTime();
						request.headers.Authorization = this.getAuthorization();
					} catch (err) {
						return reject(err);
					}
				}

				return resolve(request);
			});
		});
		if (catchResponse) {
			instance.interceptors.response.use(
				(response) => response,
				(error) => {
					if (
						error &&
						(!error.config ||
							error.config.url !== "/users/login" ||
							error.config.url !== "/users/register") &&
						error.response &&
						error.response.status === 401
					) {
						AuthLocal.deauthenticateUser();
						window.location.href = "/login";
					}

					return Promise.reject(
						error?.response?.data ? error.response.data : "error" + error
					);
				}
			);
		}
	}
}
