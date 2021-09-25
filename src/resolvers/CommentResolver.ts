import { Article } from '../models/Article';
import { User } from 'src/models/User';
import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import CreateCommentInput from '../inputs/comments/CreateCommentInput';
import UpdateCommentInput from '../inputs/comments/UpdateCommentInput';
import { Comment } from '../models/Comment';

@Resolver()
export default class CommentResolver {
  // query that returns all our books
  @Query(() => [Comment])
  comments(
    @Ctx() { user }: { user: User | null },
    @Arg('articleID', { nullable: true }) articleID: string
  ): Promise<Comment[]> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    if (articleID !== null) {
      return Comment.find({
        relations: ['user', 'article'],
        where: { article: { articleID: articleID } },
      });
    } else {
      return Comment.find({
        relations: ['user', 'article'],
      });
    }
  }
  // query to fetch an individual comment
  @Query(() => Comment)
  async comment(
    @Ctx() { user }: { user: User | null },
    @Arg('commentID') commentID: string
  ): Promise<Comment | undefined> {
    const comment = await Comment.findOne({
      where: { commentID },
      relations: ['user', 'article'],
    });
    if (!user) {
      throw Error('You are not authenticated.');
    }
    if (!comment)
      throw new Error(`The comment with id: ${commentID} does not exist`);
    return comment;
  }

  // query to create a new comment
  @Mutation(() => Comment)
  async createComment(
    @Ctx() { user }: { user: User | null },
    @Arg('data') data: CreateCommentInput,
    @Arg('articleID') articleID: string
  ): Promise<Comment> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    const comment = Comment.create(data);
    comment.user = user;
    const article = await Article.findOne(articleID);

    if (article) {
      comment.article = article;
    }
    await comment.save();
    return comment;
  }
  // query to update a comment
  @Mutation(() => Comment)
  async updateComment(
    @Ctx() { user }: { user: User | null },
    @Arg('commentID') commentID: string,
    @Arg('data') data: UpdateCommentInput
  ): Promise<Comment> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    const comment = await Comment.findOne({ where: { commentID } });
    if (!comment)
      throw new Error(`The comment with id: ${commentID} does not exist`);
    Object.assign(comment, data);
    await comment.save();
    return comment;
  }
  // query to delete a comment
  @Mutation(() => Boolean)
  async deleteComment(@Arg('commentID') commentID: string): Promise<boolean> {
    const comment = await Comment.findOne({ where: { commentID } });
    if (!comment)
      throw new Error(`The comment with id: ${commentID} does not exist`);
    await comment.remove();
    return true;
  }
}
