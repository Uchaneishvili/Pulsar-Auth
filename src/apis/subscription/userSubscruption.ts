import { gql } from "@apollo/client";

export const USER_DETAILS_UPDATED_SUBSCRIPTION = gql`
	subscription UserDetailsUpdated($id: ID!) {
		userDetailsUpdated(id: $id) {
			id
			name
			email
		}
	}
`;
