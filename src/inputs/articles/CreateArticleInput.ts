import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateArticleInput {
  @Field()
  title!: string;

  @Field()
  banner!: string;

  @Field()
  content!: string;

  @Field()
  isPublished!: boolean;
}
