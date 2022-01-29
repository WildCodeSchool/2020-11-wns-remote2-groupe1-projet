import React from 'react';
import PostCard from '../../components/posts/PostCard';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../src/queries';
import withAuth from '../../components/withAuth';
import styles from '../../styles/PostList.module.scss';

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
    user;
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

  return (
    <div className={styles.root}>
      <h1 className={styles.feedTitle}>Post Management</h1>
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
          More posts
        </button>
      </div>
    </div>
  );
};

export default withAuth(EditPosts);
