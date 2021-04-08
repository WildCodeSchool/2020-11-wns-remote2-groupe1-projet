import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import ArticleResolver from './resolvers/ArticleResolver';
import CommentResolver from './resolvers/CommentResolver';
import userResolver from './resolvers/UserResolver';
import { getExpressServer } from './express-servers';

const main = async () => {
  await createConnection();
  const { expressServer, apolloServer } = await getExpressServer();

  expressServer.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    )
  );
  console.log('Server has started!');
};
main();
