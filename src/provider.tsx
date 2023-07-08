import React, { ReactNode } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import type { GatsbyBrowser } from "gatsby"

const client = new ApolloClient({
    uri: "/.netlify/functions/server",
    cache: new InMemoryCache(),
})

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
