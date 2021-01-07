// import { compare } from 'bcrypt';
// import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';

// import CreateSessionInput from '../inputs/CreateSessionInput';
// import CreateUserInput from '../inputs/CreateUserInput';
// import UserSession from '../models/UserSession';
// import User from '../models/User';

// @Resolver()
// export default class UserResolver {
//   @Query(() => [User])
//   users(): Promise<User[]> {
//     return User.find();
//   }

//   @Query(() => User)
//   me(@Ctx() { user }: { user: User | null }): User {
//     if (!user) {
//       throw Error('You are not authenticated.');
//     }
//     return user;
//   }

//   @Mutation(() => User)
//   async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
//     const user = User.create(input);
//     await user.save();
//     return user;
//   }

//   @Mutation(() => User)
//   async createSession(
//     @Arg('input') input: CreateSessionInput,
//     @Ctx()
//     { setSessionIdCookie }: { setSessionIdCookie: (id: string) => void }
//   ): Promise<User> {
//     const { email, password } = input;
//     const user = await User.findOne({ email });
//     const authenticationError = new Error(
//       'Incorrect email and/or password.'
//     );
//     if (!user) {
//       throw authenticationError;
//     }
//     const isPasswordMatching = await compare(password, user.password);
//     if (!isPasswordMatching) {
//       throw authenticationError;
//     }
//     const userSession = UserSession.create({ user });
//     await userSession.save();
//     setSessionIdCookie(userSession.uuid);
//     return user;
//   }
// }
