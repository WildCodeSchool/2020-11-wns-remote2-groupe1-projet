import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Subscription,
  Root,
  PubSub,
  Publisher,
} from 'type-graphql';
import CreatePostInput from '../inputs/posts/CreatePostInput';
import UpdatePostInput from '../inputs/posts/UpdatePostInput';
import { Post } from '../models/Post';
import { User } from '../models/User';

type NewPostNotificationPayload = {
  post: Post;
};

@Resolver()
export default class PostResolver {
  @Query(() => [Post])
  posts(
    @Ctx() { user }: { user: User | null },
    @Arg('offset', { nullable: true }) offset: number,
    @Arg('limit', { nullable: true }) limit: number,
    @Arg('isPublished', { nullable: true }) isPublished: boolean
  ): Promise<Post[]> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    if (isPublished !== null) {
      return Post.find({
        relations: ['user'],
        take: limit,
        skip: offset,
        where: { isPublished },
      });
    } else {
      return Post.find({
        relations: ['user'],
        take: limit,
        skip: offset,
        where: { user },
      });
    }
  }

  @Query(() => Post)
  async post(
    @Ctx() { user }: { user: User | null },
    @Arg('postID') postID: string
  ): Promise<Post> {
    const post = await Post.findOne({
      where: { postID },
      relations: ['user'],
    });
    if (!user) {
      throw Error('You are not authenticated.');
    }
    if (!post) {
      throw new Error(`The post with id: ${postID} does not exist!`);
    }

    return post;
  }

  @Mutation(() => Post)
  async createPost(
    @Ctx() { user }: { user: User | null },
    @Arg('data') data: CreatePostInput,
    @PubSub('NEW_POST')
    publishNewPost: Publisher<NewPostNotificationPayload>
  ): Promise<Post> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    const post = Post.create(data);
    post.user = user;
    await post.save();
    publishNewPost({ post });
    return post;
  }

  @Mutation(() => Post)
  async updatePost(
    @Ctx() { user }: { user: User | null },
    @Arg('postID') postID: string,
    @Arg('data') data: UpdatePostInput
  ): Promise<Post> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    const post = await Post.findOne({ where: { postID } });

    if (!post) {
      throw new Error(`The post with id: ${postID} does not exist!`);
    }

    Object.assign(post, data);
    await post.save();

    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('postID') postID: string): Promise<boolean> {
    const post = await Post.findOne({ where: { postID } });

    if (!post) {
      throw new Error(`The post with id: ${postID} does not exist!`);
    }

    await post.remove();
    return true;
  }

  @Subscription({
    topics: 'NEW_POST',
  })
  newPost(@Root() notificationPayload: NewPostNotificationPayload): Post {
    return notificationPayload.post;
  }
}
