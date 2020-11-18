import React from 'react';
import Article from './Article';
import { articles } from '../../data';
import { ArticleProps } from '../../types';

const ArticleList = (): JSX.Element => {
  return (
    <div>
      <h1>Article List</h1>
      {articles.map((article: ArticleProps) => (
        <Article
          key={article.id}
          id={article.id}
          title={article.title}
          image={article.image}
          contents={article.contents}
        />
      ))}
    </div>
  );
};

export default ArticleList;
