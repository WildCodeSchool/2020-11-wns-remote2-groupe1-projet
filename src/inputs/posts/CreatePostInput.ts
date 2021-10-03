import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreatePostInput {
  @Field()
  title!: string;

  @Field()
  image!: string;

  @Field()
  content!: string;

  @Field()
  isPublished!: boolean;
}
