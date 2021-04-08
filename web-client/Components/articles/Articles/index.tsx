import React from 'react';
import ArticleCard from '../ArticleCard';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  pagination: {
    width: 'fit-content',
    margin: '2rem auto 2rem auto',
  },
  feedTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1b84c1',
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

const Articles = ({}) => {
  const { data, fetchMore } = useQuery(GET_ARTICLES, {
    variables: {
      offset: 0,
      limit: 3,
    },
    fetchPolicy: 'cache-and-network',
  });

  const articles = data?.articles;
  console.log(articles);

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
          contents={article.content}
        />
      ))}
      <Button onClick={fetchMoreArticles}>More</Button>
    </div>
  );
};

export default Articles;
