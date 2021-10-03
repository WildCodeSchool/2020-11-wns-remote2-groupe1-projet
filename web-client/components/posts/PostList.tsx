import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_POSTS, SUBSCRIBE_TO_NEW_POST } from '../../src/queries';
import { getPosts, SubscribeToNewPost } from '../../src/schemaTypes';

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

const Posts = (): JSX.Element => {
  const { data, fetchMore, subscribeToMore } = useQuery<getPosts>(GET_POSTS, {
    variables: {
      offset: 0,
      limit: 3,
      isPublished: true,
    },
    fetchPolicy: 'cache-and-network',
  });

  const posts = data?.posts || [];

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

  const [isSubscribedToNewPost, setIsSubscribedToNewPost] = useState(false);
  useEffect(() => {
    if (!isSubscribedToNewPost) {
      subscribeToMore<SubscribeToNewPost>({
        document: SUBSCRIBE_TO_NEW_POST,
        updateQuery: (prev, { subscriptionData }): getPosts => {
          if (!subscriptionData.data) return prev;
          return {
            posts: [...prev.posts, subscriptionData.data.newPost],
          };
        },
      });
      setIsSubscribedToNewPost(true);
    }
  }, [data]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.feedTitle}>
        Posts
      </Typography>

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

export default Posts;
