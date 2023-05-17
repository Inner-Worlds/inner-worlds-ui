import { gql } from "@apollo/client";

  const GET_USER = gql`
  query ($id: ID!) {
    user(id: $id) {
      name
      email
      dreams {
        id
        title
        description
        lucidity
        dreamDate
        emotions {
          id
          name
        }
        tags {
          id
          name
        }
      }
    }
  }
  `
;

export default GET_USER;