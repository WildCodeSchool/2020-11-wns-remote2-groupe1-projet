import React from 'react';
import ArticleCard from '../../Components/articles/ArticleCard';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
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
  query getArticles {
    articles {
      id
      title
      banner
      content
    }
  }
`;

const ArticleManagement = (): JSX.Element => {
  const { data } = useQuery(GET_ARTICLES);

  const articles = data?.articles;
  console.log(articles);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.feedTitle}>
        My Posts
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
    </div>
  );
};

export default ArticleManagement;
