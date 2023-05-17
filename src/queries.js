import { gql } from "@apollo/client";

  export const GET_USER = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
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

export const CREATE_DREAM = gql`
  mutation CreateDream($input: CreateDreamInput!) {
    createDream(input: $input) {
      id
      dreamDate
      title
      description
      emotions {
        name
      }
      tags {
        name
      }
      lucidity
    }
  }
`;
