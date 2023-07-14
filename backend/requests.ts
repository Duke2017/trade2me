import { gql } from "@apollo/client"

export const GET_ALLADVERTS = gql`
  query ($userId: String) {
    allAdverts(userId: $userId) {
      id
      title
      price
      description
      picture
      userId
    }
  }
`

export const CREATE_ADVERT = gql`
  mutation ($advertInput: AdvertInput) {
    createAdvert(advertInput: $advertInput) {
      id
      title
      description
      price
      picture
      userId
    }
  }
`
