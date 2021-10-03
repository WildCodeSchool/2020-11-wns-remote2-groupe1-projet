import { Post } from '../models/Post';
import { User } from 'src/models/User';
import {
  Resolver,
  Query,
  Subscription,
  Mutation,
  Arg,
  Ctx,
  Publisher,
  PubSub,
  Root,
} from 'type-graphql';
import CreateCommentInput from '../inputs/comments/CreateCommentInput';
import UpdateCommentInput from '../inputs/comments/UpdateCommentInput';
import { Comment } from '../models/Comment';

type NewCommentNotificationPayload = {
  comment: Comment;
};
@Resolver()
export default class CommentResolver {
  // query that returns all our books
  @Query(() => [Comment])
  comments(
    @Ctx() { user }: { user: User | null },
    @Arg('postID', { nullable: true }) postID: string
  ): Promise<Comment[]> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    if (postID !== null) {
      return Comment.find({
        relations: ['user', 'post'],
        where: { post: { postID: postID } },
      });
    } else {
      return Comment.find({
        relations: ['user', 'post'],
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
      relations: ['user', 'post'],
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
    @Arg('postID') postID: string,
    @PubSub('NEW_COMMENT')
    publishNewComment: Publisher<NewCommentNotificationPayload>
  ): Promise<Comment> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    const comment = Comment.create(data);
    comment.user = user;
    const post = await Post.findOne(postID);

    if (post) {
      comment.post = post;
    }
    await comment.save();
    publishNewComment({ comment });
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

  @Subscription({ topics: 'NEW_COMMENT' })
  newComment(
    @Root() notificationPayload: NewCommentNotificationPayload
  ): Comment {
    return notificationPayload.comment;
  }
}
