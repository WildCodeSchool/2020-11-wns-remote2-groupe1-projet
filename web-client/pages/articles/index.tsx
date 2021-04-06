import React from 'react';
import ArticleCard from '../../Components/pages/articles/ArticleCard';

const Articles = (): JSX.Element => {
  const articles = [];
  return (
    <div className="article-list">
      <h1 className="articleList-title">News Feed</h1>
      {articles.map((article) => (
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

export default Articles;
