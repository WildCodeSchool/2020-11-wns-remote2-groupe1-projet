import { ApolloServer } from 'apollo-server-express';
import { Request, Response } from 'express';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { setSessionIdCookie } from './express-server';
import { getUserFromSessionId } from './models/User';
import ArticleResolver from './resolvers/ArticleResolver';
import CommentResolver from './resolvers/CommentResolver';
import ImageResolver from './resolvers/ImageResolver';
import UserResolver from './resolvers/UserResolver';

export const getApolloServer = async (): Promise<{
  apolloServer: ApolloServer;
  graphQLSchema: GraphQLSchema;
}> => {
  const schema = await buildSchema({
    resolvers: [ArticleResolver, UserResolver, ImageResolver, CommentResolver],
  });
  const context = async ({ req, res }: { req: Request; res: Response }) => {
    const { sessionId } = req.cookies;
    const user = await getUserFromSessionId(sessionId);
    return {
      setSessionIdCookie: setSessionIdCookie(res),
      user,
    };
  };
  return {
    apolloServer: new ApolloServer({ schema, context }),
    graphQLSchema: schema,
  };
};
