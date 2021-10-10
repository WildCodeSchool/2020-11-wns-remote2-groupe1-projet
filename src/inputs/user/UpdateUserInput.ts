import { InputType, Field } from 'type-graphql';

@InputType()
export default class UpdateUserInput {
  @Field({ nullable: true })
  userID?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  birthDate?: Date;
}
