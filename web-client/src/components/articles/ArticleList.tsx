import React from 'react';
import ArticleCard from './ArticleCard';
import { articles } from '../../assets/data';
import { ArticleType } from '../../types';

import './articles.css';

const ArticleList = (): JSX.Element => {
  return (
    <div className="article-list">
      <h1 className="articleList-title">News Feed</h1>
      {articles.map((article: ArticleType) => (
        <ArticleCard
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
