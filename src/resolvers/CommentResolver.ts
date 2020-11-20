import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import CreateCommentInput from '../inputs/CreateCommentInput';
import { Comment } from '../models/Comment';

@Resolver()
export default class CommmentResolver {
  @Query(() => [Comment])
  comments(): Promise<Comment[]> {
    return Comment.find();
  }

  @Mutation(() => Comment)
  async createComment(@Arg('data') data: CreateCommentInput): Promise<Comment> {
    const commment = Comment.create(data);
    await commment.save();
    return commment;
  }
}
