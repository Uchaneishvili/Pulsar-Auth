import { gql } from "@apollo/client";

export const GET_USERS = gql`
	query getUsers($page: Int!) {
		getUsers(page: $page) {
			nodes {
				id
				firstName
				lastName
				userName
				createdAt
				successedSignInCount
			}
			totalCount
		}
	}
`;
