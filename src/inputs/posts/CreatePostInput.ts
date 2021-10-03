import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreatePostInput {
  @Field()
  title!: string;

  @Field()
  banner!: string;

  @Field()
  content!: string;

  @Field()
  isPublished!: boolean;
}
