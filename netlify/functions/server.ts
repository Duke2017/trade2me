import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { typeDefs } from '../../backend/schema'
import { resolvers } from '../../backend/resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const handler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    middleware: [
      // @ts-ignore
      async (event) => {
        event.requestContext = {
          // @ts-ignore
          http: { method: 'POST' },
        };
        return (result) => result;
      },
    ],
  },
);
