import { gql } from '@apollo/client'
export const LOG_IN = gql`
    mutation authorize($username: String!, $password: String!) {
        authorize(credentials: { username: $username, password: $password}) {
        accessToken
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation createReview($repositoryName:String!, $ownerName:String!, $rating:Int!, $text:String) {
        createReview(review:{
            repositoryName:$repositoryName,
            ownerName :$ownerName,
            rating: $rating,
            text: $text
        }){
            repository{
                id
                ownerName
            }
        }
    }
`

export const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(user:{
            password:$password,
            username:$username
        }) {
            id
            username
        }
    }
`