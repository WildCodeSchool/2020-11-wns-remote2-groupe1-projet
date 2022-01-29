import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { useQuery } from '@apollo/client';
import { GET_POSTS, SUBSCRIBE_TO_NEW_POST } from '../../src/queries';
import { getPosts, SubscribeToNewPost } from '../../src/schemaTypes';
import styles from '../../styles/PostList.module.scss';

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

  return (
    <div className={styles.root}>
      <h1 className={styles.feedTitle}>Posts</h1>
      <div className={styles.postList}>
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
        <button className={styles.feedButton} onClick={fetchMorePosts}>
          More
        </button>
      </div>
    </div>
  );
};

export default Posts;
