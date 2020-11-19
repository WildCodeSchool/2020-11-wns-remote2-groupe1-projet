import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import CreateArticleInput from '../inputs/CreateArticleInput';
import UpdateArticleInput from '../inputs/UpdateArticleInput';
import { Article } from '../models/Article';

@Resolver()
export default class ArticleResolver {
  @Query(() => [Article])
  articles(): Promise<Article[]> {
    return Article.find();
  }

  @Query(() => Article)
  async article(@Arg('id') id: string): Promise<Article> {
    const article = await Article.findOne({ where: { id } });

    if (!article) {
      throw new Error(`The article with id: ${id} does not exist!`);
    }

    return article;
  }

  @Mutation(() => Article)
  async createArticle(@Arg('data') data: CreateArticleInput): Promise<Article> {
    const article = Article.create(data);
    await article.save();
    return article;
  }

  @Mutation(() => Article)
  async updateArticle(
    @Arg('id') id: string,
    @Arg('data') data: UpdateArticleInput
  ): Promise<Article> {
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
}
