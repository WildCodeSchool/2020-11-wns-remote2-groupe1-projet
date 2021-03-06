import React from 'react';
import ArticleCard from './article-card/articleCard';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_ARTICLES } from '../../src/queries';
import { getArticles } from '../../src/schemaTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  feedTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1b84c1',
  },
  feedButton: {
    display: 'block',
    margin: '2rem auto 2rem auto',
  },
}));

const Articles = (): JSX.Element => {
  const { data, fetchMore } = useQuery<getArticles>(GET_ARTICLES, {
    variables: {
      offset: 0,
      limit: 3,
      isPublished: true,
    },
    fetchPolicy: 'cache-and-network',
  });

  const articles = data?.articles || [];

  const fetchMoreArticles = () => {
    fetchMore({
      variables: {
        offset: articles.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          articles: [...prev.articles, ...fetchMoreResult.articles],
        });
      },
    });
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.feedTitle}>
        Posts
      </Typography>

      {articles?.map((article) => (
        <ArticleCard
          key={article.id}
          id={article.id}
          title={article.title}
          image={article.banner}
          content={article.content}
          isPublished={article.isPublished}
          user={article.user}
        />
      ))}
      <div>
        <Button
          className={classes.feedButton}
          color="primary"
          variant="contained"
          size="large"
          onClick={fetchMoreArticles}
        >
          More
        </Button>
      </div>
    </div>
  );
};

export default Articles;
