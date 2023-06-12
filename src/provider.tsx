import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    uri: "/.netlify/functions/server",
    cache: new InMemoryCache(),
})

export const wrapRootElement = ({ element }:any) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
