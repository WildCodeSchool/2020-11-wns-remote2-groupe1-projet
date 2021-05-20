import { InputType, Field } from 'type-graphql';
import { User } from '../../models/User';

@InputType()
export default class CreateArticleInput {
  @Field()
  title!: string;

  @Field()
  banner!: string;

  @Field()
  content!: string;

  @Field()
  isVisible?: boolean;

  author?: User;
}
