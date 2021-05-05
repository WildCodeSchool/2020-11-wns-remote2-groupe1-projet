export interface GetArticles_articles {
  __typename: 'Article';
  id: string;
  title: string;
}

export interface GetArticles {
  articles: GetArticles_articles[];
}
