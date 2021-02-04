import { MaxLength, MinLength } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { UserRole } from '../../models/User';

@InputType()
export default class CreateUserInput {
  @Field()
  @MaxLength(25)
  firstName!: string;

  @Field()
  @MaxLength(25)
  lastName!: string;

  @Field()
  @MinLength(8)
  password!: string;

  @Field()
  email!: string;

  @Field()
  school!: string;

  @Field()
  birthDate?: Date;
}
