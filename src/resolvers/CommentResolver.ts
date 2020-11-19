import { Resolver, Query } from 'type-graphql';
import { Comment } from '../models/Comment';

@Resolver()
export default class CommmentResolver {
  @Query(() => [Comment])
  comments(): Promise<Comment[]> {
    return Comment.find();
  }
}
