import { ApolloServer } from 'apollo-server-express';
import { Request, Response } from 'express';
import { buildSchema } from 'type-graphql';

import { setSessionIdCookie } from './express-server';
import { getUserFromSessionId } from './models/User';
import ArticleResolver from './resolvers/ArticleResolver';
import CommentResolver from './resolvers/CommentResolver';
import UserResolver from './resolvers/UserResolver';

export const getApolloServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [CommentResolver, ArticleResolver, UserResolver],
  });
  const context = async ({ req, res }: { req: Request; res: Response }) => {
    const { sessionId } = req.cookies;
    const user = await getUserFromSessionId(sessionId);
    return {
      setSessionIdCookie: setSessionIdCookie(res),
      user,
    };
  };
  return new ApolloServer({ schema, context });
};
