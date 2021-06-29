import React from 'react';
import ArticleCard from './article-card';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';

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

const GET_ARTICLES = gql`
  query getArticles($offset: Float!, $limit: Float!) {
    articles(limit: $limit, offset: $offset) {
      id
      title
      banner
      content
    }
  }
`;

const Articles = (): JSX.Element => {
  const { data, fetchMore } = useQuery(GET_ARTICLES, {
    variables: {
      offset: 0,
      limit: 3,
    },
    fetchPolicy: 'cache-and-network',
  });

  const articles: Array<{
    id: string;
    title: string;
    banner: string;
    content: string;
    isPublished: boolean;
  }> = data?.articles || [];

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
