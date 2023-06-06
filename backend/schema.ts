export const typeDefs = `#graphql
  type Query {
    allAdverts: [Advert!]!
    advert(id: ID!): Advert! 
  }

  type Advert {
    id: ID!
    title: String!
    description: String!
  }

  input AdvertInput {
    title: String
    description: String
  }
  type Mutation {
    createAdvert(advertInput: AdvertInput): Advert
    updateAdvert(id: ID!, advertInput: AdvertInput): Advert!
    deleteAdvert(id: ID!): Boolean
  }
`;