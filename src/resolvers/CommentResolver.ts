import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import CreateCommentInput from '../inputs/CreateCommentInput';
import { Comment } from '../models/Comment';

@Resolver()
export default class CommmentResolver {
  @Query(() => [Comment])
  comments(): Promise<Comment[]> {
    return Comment.find();
  }

  @Query(() => Comment)
  comment(@Arg('id') id: string) {
    return Comment.findOne({ where: { id } });
  }

  @Mutation(() => Comment)
  async createComment(@Arg('data') data: CreateCommentInput): Promise<Comment> {
    const commment = Comment.create(data);
    await commment.save();
    return commment;
  }
}
