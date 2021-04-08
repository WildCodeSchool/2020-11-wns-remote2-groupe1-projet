import React from 'react';
import ArticleCard from '../../Components/pages/articles/ArticleCard';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

const Articles = (): JSX.Element => {
  const router = useRouter();
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
      <Button
        onClick={() => {
          router.push({
            pathname: '/article/[idArticle]',
            query: { idArticle: '1' },
          });
        }}
      >
        Bouton article
      </Button>
    </div>
  );
};

export default Articles;
