import React from 'react';
import ArticleCard from '../../components/articles/ArticleCard';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_ARTICLES } from '../../src/queries';
import withAuth from '../../components/withAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  feedTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1b84c1',
  },
  feedButton: {
    display: 'block',
    margin: '2rem auto 2rem auto',
  },
}));

const EditArticles = (): JSX.Element => {
  const { data, fetchMore } = useQuery(GET_ARTICLES, {
    variables: {
      offset: 0,
      limit: 3,
      isPublished: null,
    },
    fetchPolicy: 'cache-and-network',
  });

  const articles: Array<{
    articleID: string;
    title: string;
    banner: string;
    content: string;
    isPublished: boolean;
    user: any;
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
        Article Management
      </Typography>

      {articles?.map((article) => (
        <ArticleCard
          key={article.articleID}
          articleID={article.articleID}
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

export default withAuth(EditArticles);
