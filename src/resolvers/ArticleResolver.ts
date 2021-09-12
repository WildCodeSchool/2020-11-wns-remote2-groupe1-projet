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
import CreateArticleInput from '../inputs/articles/CreateArticleInput';
import UpdateArticleInput from '../inputs/articles/UpdateArticleInput';
import { Article } from '../models/Article';
import { User } from '../models/User';

type NewArticleNotificationPayload = {
  article: Article;
};

@Resolver()
export default class ArticleResolver {
  @Query(() => [Article])
  articles(
    @Ctx() { user }: { user: User | null },
    @Arg('offset', { nullable: true }) offset: number,
    @Arg('limit', { nullable: true }) limit: number,
    @Arg('isPublished', { nullable: true }) isPublished: boolean
  ): Promise<Article[]> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    if (isPublished !== null) {
      return Article.find({
        relations: ['user'],
        take: limit,
        skip: offset,
        where: { isPublished },
      });
    } else {
      return Article.find({
        relations: ['user'],
        take: limit,
        skip: offset,
        where: { user },
      });
    }
  }

  @Query(() => Article)
  async article(
    @Ctx() { user }: { user: User | null },
    @Arg('id') id: string
  ): Promise<Article> {
    const article = await Article.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!user) {
      throw Error('You are not authenticated.');
    }
    if (!article) {
      throw new Error(`The article with id: ${id} does not exist!`);
    }

    return article;
  }

  @Mutation(() => Article)
  async createArticle(
    @Ctx() { user }: { user: User | null },
    @Arg('data') data: CreateArticleInput,
    @PubSub('NEW_ARTICLE')
    publishNewArticle: Publisher<NewArticleNotificationPayload>
  ): Promise<Article> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    const article = Article.create(data);
    article.user = user;
    await article.save();
    publishNewArticle({ article });
    return article;
  }

  @Mutation(() => Article)
  async updateArticle(
    @Ctx() { user }: { user: User | null },
    @Arg('id') id: string,
    @Arg('data') data: UpdateArticleInput
  ): Promise<Article> {
    if (!user) {
      throw Error('You are not authenticated.');
    }
    const article = await Article.findOne({ where: { id } });

    if (!article) {
      throw new Error(`The article with id: ${id} does not exist!`);
    }

    Object.assign(article, data);
    await article.save();

    return article;
  }

  @Mutation(() => Boolean)
  async deleteArticle(@Arg('id') id: string): Promise<boolean> {
    const article = await Article.findOne({ where: { id } });

    if (!article) {
      throw new Error(`The article with id: ${id} does not exist!`);
    }

    await article.remove();
    return true;
  }

  @Subscription({
    topics: 'NEW_ARTICLE',
  })
  newArticle(
    @Root() notificationPayload: NewArticleNotificationPayload
  ): Article {
    return notificationPayload.article;
  }
}
