import express, { Application, Response } from 'express';
import cookieParser from 'cookie-parser';
import { getApolloServer } from './apollo-server';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { GraphQLSchema } from 'graphql';
import { graphqlUploadExpress } from 'graphql-upload';

export const getExpressServer = async (): Promise<{
  expressServer: Application;
  apolloServer: ApolloServer;
  graphQLSchema: GraphQLSchema;
}> => {
  const { apolloServer, graphQLSchema } = await getApolloServer();

  const expressServer = express()
    .use(cookieParser())
    .use('/public', express.static(path.join(__dirname, '..', 'public')))
    .use(graphqlUploadExpress({maxFileSize: 1000000, maxFiles: 10}))
    

    await apolloServer.start();
  apolloServer.applyMiddleware({ app: expressServer });
  return { expressServer, apolloServer, graphQLSchema };
};

export const setSessionIdCookie =
  (res: Response) =>
  (id: string): void => {
    res.cookie('sessionId', id, {
      maxAge: 2592000000,
      httpOnly: true,
      secure: !!process.env.SECURE_COOKIES,
      sameSite: 'strict',
      path: '/',
    });
  };
