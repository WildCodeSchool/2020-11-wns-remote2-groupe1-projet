import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateCommentInput {
  @Field()
  content!: string;
}
