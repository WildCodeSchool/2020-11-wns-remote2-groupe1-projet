// To obtain data from users, we have to build an input type
// to specify what fields are necessary for this mutation.

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
