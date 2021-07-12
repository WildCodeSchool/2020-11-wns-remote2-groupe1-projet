import createTestClient from 'supertest';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

import { getExpressServer } from '../express-server';
import { Article } from '../models/Article';

describe('Article resolvers', () => {
  let testClient;

  beforeEach(async () => {
    const connectionOptions = await getConnectionOptions();
    await createConnection({
      ...connectionOptions,
      dropSchema: true,
      entities: [Article],
      synchronize: true,
      logging: false,
    });
    const { expressServer } = await getExpressServer();
    testClient = createTestClient(expressServer);
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
            articles {
                title
                isPublished
                content
            }
        }`,
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
