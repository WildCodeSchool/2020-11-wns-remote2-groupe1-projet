import React from 'react';
import PostCard from '../../components/posts/PostCard';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../src/queries';
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
  postList: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '720px',
    margin: '0 auto',
    padding: '0 1.5rem',
    gap: '1.5rem',
  },
}));

const EditPosts = (): JSX.Element => {
  const { data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      offset: 0,
      limit: 3,
      isPublished: null,
    },
    fetchPolicy: 'cache-and-network',
  });

  const posts: Array<{
    postID: string;
    title: string;
    image: string;
    content: string;
    isPublished: boolean;
    user: any;
  }> = data?.posts || [];

  const fetchMorePosts = () => {
    fetchMore({
      variables: {
        offset: posts.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          posts: [...prev.posts, ...fetchMoreResult.posts],
        });
      },
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.feedTitle}>
        Post Management
      </Typography>
      <div className={classes.postList}>
        {posts?.map((post) => (
          <PostCard
            key={post.postID}
            postID={post.postID}
            title={post.title}
            image={post.image}
            content={post.content}
            isPublished={post.isPublished}
            user={post.user}
          />
        ))}
      </div>
      <div>
        <Button
          className={classes.feedButton}
          color="primary"
          variant="contained"
          size="large"
          onClick={fetchMorePosts}
        >
          More
        </Button>
      </div>
    </div>
  );
};

export default withAuth(EditPosts);
