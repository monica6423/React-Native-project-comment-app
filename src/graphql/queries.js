import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
            node {
                id
                fullName
                description
                language
                stargazersCount
                forksCount
                reviewCount
                ratingAverage
                ownerAvatarUrl
            }
        }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`

export const GET_REPOSITORY = gql`
  query repository($id: ID!){
    repository(id: $id) {
      description
      forksCount
      fullName
      id
      language
      ownerAvatarUrl
      ratingAverage
      reviewCount
      stargazersCount
      url
       reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
       }
    }
  }
`

