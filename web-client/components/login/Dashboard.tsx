import { useQuery } from '@apollo/client';
import { Button, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/Contexts';
import { GET_ARTICLES, GET_RECENT_USERS } from '../../src/queries';
import { GetRecentUsers } from '../../src/schemaTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  dashboardTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1b84c1',
  },
  contentContainer: {
    margin: 'auto',
    paddingTop: '1rem',
    maxWidth: '30%',
    textAlign: 'center',
  },
}));

function Dashboard() {
  const classes = useStyles();

  const { currentUser } = useContext(UserContext);

  const { loading, data } = useQuery<GetRecentUsers>(GET_RECENT_USERS);

  const { data: articleData } = useQuery(GET_ARTICLES, {
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
  }> = articleData?.articles || [];
  return (
    <div className={classes.root}>
      <h1
        className={classes.dashboardTitle}
      >{`${currentUser?.firstName}'s dashboard`}</h1>
      <div className={classes.contentContainer}>
        <h2>Account Information</h2>
        <p>
          Name : <span>{currentUser.firstName}</span>{' '}
          <span>{currentUser.lastName}</span>
        </p>

        <h2>Users Overview</h2>
        <div>{loading ? '…' : data?.recentUsers}</div>

        <h2>Articles Overview</h2>
        {articles?.map((article) => {
          return <div key={article.articleID}>{article.title}</div>;
        })}
      </div>
    </div>
  );
}

export default Dashboard;
