import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import { getExpressServer } from './express-servers';

const main = async () => {
  const connectionOptions = await getConnectionOptions();
  await createConnection({
    ...connectionOptions,
    synchronize: true,
    entities: ['dist/models/*.js'],
  });
  const { expressServer, apolloServer } = await getExpressServer();

  expressServer.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    )
  );
  console.log('Server has started!');
};
main();
