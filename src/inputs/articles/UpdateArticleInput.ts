import { InputType, Field } from 'type-graphql';
import { User } from '../../models/User';

@InputType()
export default class UpdateArticleInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  banner?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  isPublished?: boolean;

  @Field({ nullable: true })
  updatedAt?: Date;

  user?: User;
}
