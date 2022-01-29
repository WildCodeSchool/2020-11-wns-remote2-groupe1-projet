import { Box, Container } from '@material-ui/core';
import React from 'react';
import { useQuery } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';
import { GET_POST } from '../../src/queries';
import { getPostById } from '../../src/schemaTypes';
import Comment from './Comment';
import ReactMarkdown from 'react-markdown';
import styles from '../../styles/Post.module.scss';

const Post: React.FC<{ router: NextRouter }> = ({}) => {
  const router = useRouter();
  const postID = router?.query?.postID;
  const { data } = useQuery<getPostById>(GET_POST, {
    variables: { postID },
  });
  const post = data?.post;

  let image;
  if (post?.image) {
    image = post?.image;
  } else
    image =
      'https://rent-my-boat-nice.fr/wp-content/uploads/2020/08/placeholder.png';

  return (
    <div>
      <img src={image} className={styles.media} height="250px"></img>
      <Container maxWidth="sm">
        <Box m={2}>
          <div>
            <h1>{post?.title}</h1>
            <p>written by {post?.user?.username}</p>
            <p className={styles.dateBlock}>
              <span className={styles.dateUnit}>
                Created at :
                <span>
                  {new Date(post?.createdAt).toLocaleString('fr', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}{' '}
                </span>
              </span>
              <span className={styles.dateUnit}>
                Updated at :
                <span>
                  {new Date(post?.updatedAt).toLocaleString('fr', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}{' '}
                </span>
              </span>
            </p>
            <ReactMarkdown className={styles.postContent}>
              {post?.content}
            </ReactMarkdown>
          </div>
        </Box>
        <hr className={styles.separator} />
        <Comment postID={postID} />
      </Container>
    </div>
  );
};

export default Post;
