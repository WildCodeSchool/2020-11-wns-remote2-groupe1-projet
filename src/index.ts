import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import ArticleResolver from './resolvers/ArticleResolver';
import CommmentResolver from './resolvers/CommentResolver';

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    // Don't forget to add your new Resolvers here
    resolvers: [ArticleResolver, CommmentResolver],
  });
  const server = new ApolloServer({ schema });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
  console.log('Server has started!');
};

main();
