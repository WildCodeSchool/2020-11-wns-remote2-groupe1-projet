import createTestClient from 'supertest';
import { createConnection, getConnection } from 'typeorm';

import { getExpressServer } from '../express-server';
import { Article } from '../models/Article';
import UserSession from '../models/UserSession';
import { User } from '../models/User';
import { Classroom } from '../models/Classroom';
import { Conversation } from '../models/Conversation';
import { Message } from '../models/Message';

describe('Article resolvers', () => {
  let testClient;

  beforeEach(async () => {
    // const connectionOptions = await getConnectionOptions();
    await createConnection({
      // ...connectionOptions,
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [Article, User, UserSession, Classroom, Conversation, Message],
      synchronize: true,
      logging: false,
    });
    const { expressServer } = await getExpressServer();
    testClient = createTestClient(expressServer);

    // const userSession = UserSession.create({ user: User });
    // await userSession.save();

    // await testClient.post('/graphql').send({
    //   query: `mutation {
    //               createSession(input: {
    //                 email: "danielo.visage@gmail.com",
    //                 password: "Test1234"
    //               }) {
    //                 email
    //               }
    //             }`,
    // });
  });

  afterEach(() => {
    const conn = getConnection();
    return conn.close();
  });

  describe('get articles', () => {
    it('returns all articles', async () => {
      const article1 = Article.create({
        title: 'Test Article 1',
        banner: '',
        isPublished: false,
        content: 'test content 1',
      });
      await article1.save();

      const article2 = Article.create({
        title: 'Test Article 2',
        banner: '',
        isPublished: true,
        content: 'test content 2',
      });
      await article2.save();

      const response = await testClient.post('/graphql').send({
        query: `{
          articles(limit: 10, offset: 0, isPublished: true){
            title
            banner
            content
            isPublished
          }
        }
        `,
      });

      expect(JSON.parse(response.text).data).toEqual({
        articles: [
          {
            title: 'Test Article 1',
            banner: '',
            isPublished: false,
            content: 'test content 1',
          },
          {
            title: 'Test Article 2',
            banner: '',
            isPublished: true,
            content: 'test content 2',
          },
        ],
      });
    });
  });
});
