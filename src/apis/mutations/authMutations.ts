import { gql } from "@apollo/client";

export const REFRESH_TOKEN_MUTATION = gql`
	mutation RefreshToken($refreshToken: String!) {
		refreshToken(refreshToken: $refreshToken) {
			token
		}
	}
`;

export const LOGIN_MUTATION = gql`
	mutation loginUser($userName: String!, $password: String!) {
		loginUser(userName: $userName, password: $password) {
			token
			id
			userName
			firstName
			lastName
			createdAt
			successedSignInCount
		}
	}
`;

export const REGISTER_MUTATION = gql`
	mutation registerUser($userInput: UserInput!) {
		registerUser(userInput: $userInput) {
			token
			user {
				id
				firstName
				lastName
				userName
				password
			}
		}
	}
`;

export const UPDATE_USER_DETAILS = gql`
	mutation UpdateUserDetails($id: ID!, $name: String, $email: String) {
		updateUserDetails(id: $id, name: $name, email: $email) {
			id
			name
			email
		}
	}
`;
