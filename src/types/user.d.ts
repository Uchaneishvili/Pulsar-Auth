export interface IUser {
	id: string;
	userName: string;
	firstName: string;
	lastName: string;
	successedSignInCount: number;
	createdAt: string;
}

export interface ILoginInput {
	userName: string;
	password: string;
}

export interface UserInput {
	firstName: string;
	lastName: string;
	userName: string;
	password: string;
}

export interface ILoginOtpInput {
	userName: string;
}

export interface ILoginResult {
	token?: string;
	user?: IUser;
}
