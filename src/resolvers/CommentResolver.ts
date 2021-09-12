// Revolvers are collections of functions that are mapped into a single object.
// Here we define our solvers with TypeScript classes and decorators.
// TypeGraphQL will generate the schema for us.

import { User } from 'src/models/User';
import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import CreateCommentInput from '../inputs/comments/CreateCommentInput';
import UpdateCommentInput from '../inputs/comments/UpdateCommentInput';
import { Comment } from '../models/Comment';

@Resolver()
export default class CommentResolver {
  // query that returns all our books
  @Query(() => [Comment])
  comments(@Ctx() { user }: { user: User | null }): Promise<Comment[]> {
    if (!user) {
      throw Error('You are not authenticated.');
    } else {
      return Comment.find();
    }
  }
  // query to fetch an individual comment
  @Query(() => Comment)
  async comment(@Arg('id') id: string): Promise<Comment | undefined> {
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) throw new Error(`The comment with id: ${id} does not exist`);
    return comment;
  }
  // query to create a new comment
  @Mutation(() => Comment)
  async createComment(
    @Ctx() { user }: { user: User | null },
    @Arg('data') data: CreateCommentInput
  ): Promise<Comment> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    const commment = Comment.create(data);
    await commment.save();
    return commment;
  }
  // query to update a comment
  @Mutation(() => Comment)
  async updateComment(
    @Ctx() { user }: { user: User | null },
    @Arg('id') id: string,
    @Arg('data') data: UpdateCommentInput
  ): Promise<Comment> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) throw new Error(`The comment with id: ${id} does not exist`);
    Object.assign(comment, data);
    await comment.save();
    return comment;
  }
  // query to delete a comment
  @Mutation(() => Boolean)
  async deleteComment(@Arg('id') id: string): Promise<boolean> {
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) throw new Error(`The comment with id: ${id} does not exist`);
    await comment.remove();
    return true;
  }
}
