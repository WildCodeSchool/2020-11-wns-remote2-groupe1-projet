import { InputType, Field } from 'type-graphql';
import { Article } from '../../models/Article';
import { User } from '../../models/User';

@InputType()
export default class CreateCommentInput {
  @Field()
  content!: string;

  author?: User;

  article?: Article;
}
