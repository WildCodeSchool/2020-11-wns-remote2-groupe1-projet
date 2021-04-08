import React from 'react';
import ArticleCard from '../ArticleCard';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Typography, Grid } from '@material-ui/core';
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
  textCenter: {
    textAlign: 'center',
  },
}));

const GET_ARTICLES = gql`
  query getArticles {
    articles {
      id
      title
      banner
      content
    }
  }
`;

const Articles = () => {
  const { data } = useQuery(GET_ARTICLES);

  console.log(data);
  const articles = data?.articles;
  console.log(articles);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.textCenter}>
        News Feed
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
      <Pagination
        className={classes.pagination}
        count={5}
        variant="outlined"
        color="primary"
      />
    </div>
  );
};

export default Articles;
