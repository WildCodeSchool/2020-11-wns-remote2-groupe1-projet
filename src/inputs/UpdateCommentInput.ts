import { InputType, Field } from 'type-graphql';

@InputType()
export default class UpdateCommentInput {
  @Field({ nullable: true })
  content?: string;
}
