export const typeDefs = `#graphql
  type Query {
    allAdverts(id: ID!): Advert!
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
    createAdvert(advertInput: AdvertInput): Advert!
  }
`;