import createTestClient from 'supertest';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

import { getExpressServer } from '../express-server';
import UserSession from '../models/UserSession';
import { User, UserRole } from '../models/User';

describe('User resolvers', () => {
  let testClient;

  beforeEach(async () => {
    const connectionOptions = await getConnectionOptions();
    await createConnection({
      ...connectionOptions,
      dropSchema: true,
      entities: [User, UserSession],
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

  describe('query users', () => {
    it('returns all users', async () => {
      const user1 = User.create({
        email: 'laurepincon@gmail.com',
        password: 'laurepassword',
        firstName: 'Laure',
        lastName: 'Pinçon',
        birthDate: '10/10/1980',
        school: 'Ecole de Reims',
        role: UserRole.STUDENT,
      });
      await user1.save();

      const user2 = User.create({
        email: 'pierreroulle@gmail.com',
        password: 'pierrepassword',
        firstName: 'Pierre',
        lastName: 'Roulle',
        birthDate: '10/10/1984',
        school: 'Ecole de Lille',
        role: UserRole.STUDENT,
      });
      await user2.save();

      const response = await testClient.post('/graphql').send({
        query: `{
        users {
          firstName
          lastName
        }
      }
      `,
      });

      expect(JSON.parse(response.text).data).toEqual({
        users: [
          {
            firstName: 'Laure',
            lastName: 'Pinçon',
          },
          {
            firstName: 'Pierre',
            lastName: 'Roulle',
          },
        ],
      });
    });
  });

  // describe('query me', () => {
  //   let user: User;

  //   beforeEach(async () => {
  //     user = User.create({
  //       email: 'laurepincon@gmail.com',
  //       password: 'laurepassword',
  //       firstName: 'Laure',
  //       lastName: 'Pinçon',
  //       birthDate: '10/10/1980',
  //       school: 'Ecole de Reims',
  //       role: UserRole.STUDENT,
  //     });
  //     await user.save();
  //   });

  //   describe('when user is not authenticated', () => {
  //     it('returns error', async () => {
  //       const response = await testClient.post('/graphql').send({
  //         query: `{
  //           me {
  //             email
  //           }
  //         }
  //         `,
  //       });

  //       expect(response.text).toMatch('You are not authenticated.');
  //     });
  //   });

  //   describe('when user is authenticated', () => {
  //     it('returns user', async () => {
  //       const userSession = UserSession.create({ user: User });
  //       await userSession.save();

  //       const response = await testClient
  //         .post('/graphql')
  //         .set('Cookie', [`sessionId=${userSession.uuid}`])
  //         .send({
  //           query: `{
  //               me {
  //                 email
  //               }
  //             }
  //           `,
  //         });

  //       expect(JSON.parse(response.text).data).toEqual({
  //         me: {
  //           email: user.email,
  //         },
  //       });
  //     });
  //   });
  // });

  // describe('mutation createUser', () => {
  //   it('creates and returns a new user', async () => {
  //     const response = await testClient.post('/graphql').send({
  //       query: `mutation {
  //         createUser(
  //           input: {
  //             email: "lucrenaud@gmail.com"
  //             password: "bateaubateau"
  //             firstName: "Arman"
  //             lastName: "Durand"
  //             birthDate: '10/10/1980',
  //             school: 'Ecole de Rennes',
  //             role: UserRole.STUDENT,
  //           }
  //         ) {
  //           firstName
  //           lastName
  //         }
  //       }
  //       `,
  //     });

  //     expect(await User.count({})).toEqual(1);
  //     expect(JSON.parse(response.text).data).toEqual({
  //       createUser: {
  //         firstName: 'Arman',
  //         lastName: 'Durand',
  //       },
  //     });
  //   });
  // });

  // describe('mutation createSession', () => {
  //   describe('when username does not match existing user', () => {
  //     it('returns error', async () => {
  //       const response = await testClient.post('/graphql').send({
  //         query: `mutation {
  //             createSession(input: {
  //               email: "vmarchand@gmail.com",
  //               password: "bateau8888"
  //             }) {
  //               email
  //             }
  //           }
  //           `,
  //       });
  //       expect(response.text).toMatch('Incorrect username and/or password.');
  //     });
  //   });

  //   describe('when username matches existing user', () => {
  //     let user: User;
  //     beforeEach(async () => {
  //       user = User.create({
  //         email: 'laurepincon@gmail.com',
  //         password: 'laurepassword',
  //         firstName: 'Laure',
  //         lastName: 'Pinçon',
  //         birthDate: '10/10/1980',
  //         school: 'Ecole de Reims',
  //         role: UserRole.STUDENT,
  //       });
  //       await user.save();
  //     });

  //     describe('when password does not match user password', () => {
  //       it('returns error', async () => {
  //         const response = await testClient.post('/graphql').send({
  //           query: `mutation {
  //             createSession(input: {
  //               email: "laurepincon@gmail.com",
  //               password: "lauremotdepasse"
  //             }) {
  //               email
  //             }
  //           }
  //           `,
  //         });
  //         expect(response.text).toMatch('Incorrect username and/or password.');
  //       });
  //     });

  //     describe('when password matches user password', () => {
  //       it('creates user session and sets cookie with user session ID', async () => {
  //         const response = await testClient.post('/graphql').send({
  //           query: `mutation {
  //             createSession(input: {
  //               email: "laurepincon@gmail.com",
  //               password: "laurepassword"
  //             }) {
  //               email
  //             }
  //           }
  //           `,
  //         });

  //         expect(JSON.parse(response.text).data.createSession).toEqual({
  //           email: 'laurepincon@gmail.com',
  //         });

  //         const userSession = await UserSession.findOneOrFail({
  //           user: User,
  //         });
  //         const cookie = response.header['set-cookie'][0];
  //         expect(cookie).toMatch(`sessionId=${userSession.uuid}`);
  //         expect(cookie).toMatch(`Path=/`);
  //         expect(cookie).toMatch(`Max-Age=2592000`);
  //         expect(cookie).toMatch(`HttpOnly`);
  //         expect(cookie).toMatch(`SameSite=Strict`);
  //       });
  //     });
  //   });
  // });
});
