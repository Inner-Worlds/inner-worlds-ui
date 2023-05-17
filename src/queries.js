import { gql } from "@apollo/client";

  const GET_USER = gql`
  query ($id: ID!) {
    user(id: $id) {
      name
      email
      dreams {
        title
        description
        lucidity
        dreamDate
        emotions {
          name
        }
        tags {
          name
        }
      }
    }
  }
  `
;

export default GET_USER;