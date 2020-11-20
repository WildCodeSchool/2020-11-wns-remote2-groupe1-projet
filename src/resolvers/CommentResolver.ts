import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import CreateCommentInput from '../inputs/comments/CreateCommentInput';
import UpdateCommentInput from '../inputs/comments/UpdateCommentInput';
import { Comment } from '../models/Comment';

@Resolver()
export default class CommmentResolver {
  @Query(() => [Comment])
  comments(): Promise<Comment[]> {
    return Comment.find();
  }

  @Query(() => Comment)
  async comment(@Arg('id') id: string): Promise<Comment | undefined> {
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) throw new Error(`The comment with id: ${id} does not exist`);
    return comment;
  }

  @Mutation(() => Comment)
  async createComment(@Arg('data') data: CreateCommentInput): Promise<Comment> {
    const commment = Comment.create(data);
    await commment.save();
    return commment;
  }

  @Mutation(() => Comment)
  async updateComment(
    @Arg('id') id: string,
    @Arg('data') data: UpdateCommentInput
  ): Promise<Comment> {
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) throw new Error(`The comment with id: ${id} does not exist`);
    Object.assign(comment, data);
    await comment.save();
    return comment;
  }

  @Mutation(() => Boolean)
  async deleteComment(@Arg('id') id: string): Promise<boolean> {
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) throw new Error(`The comment with id: ${id} does not exist`);
    await comment.remove();
    return true;
  }
}
