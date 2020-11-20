import { InputType, Field } from 'type-graphql';
import { User } from '../../models/User';

@InputType()
export default class UpdateCommentInput {
  @Field({ nullable: true })
  content?: string;

  updateAt?: Date;

  author?: User;
}
