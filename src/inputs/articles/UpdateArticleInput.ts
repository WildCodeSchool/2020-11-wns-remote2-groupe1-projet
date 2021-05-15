import { InputType, Field } from 'type-graphql';
import { User } from '../../models/User';

@InputType()
export default class UpdateArticleInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  banner?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  isVisible!: boolean;

  @Field()
  updatedAt?: Date;

  author?: User;
}
