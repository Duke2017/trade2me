export const typeDefs = `#graphql
  type Query {
    allAdverts: [Advert!]!
    advert(id: ID!): Advert! 
  }

  type Advert {
    id: ID!
    title: String!
    price: Int!
    description: String!
    picture: String
    userId: String!
  }

  input AdvertInput {
    title: String
    price: Int
    description: String
    picture: String
    userId: String
  }
  type Mutation {
    createAdvert(advertInput: AdvertInput): Advert
    updateAdvert(id: ID!, advertInput: AdvertInput): Advert!
    deleteAdvert(id: ID!): Boolean
  }
`;