import { Box, Container } from '@material-ui/core';
import React from 'react';
import { useQuery } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { GET_POST } from '../../src/queries';
import { getPostById } from '../../src/schemaTypes';
import Comment from './Comment';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dateBlock: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateUnit: {
      display: 'flex',
      flexDirection: 'column',
    },
    media: {
      width: '100%',
      objectFit: 'cover',
    },
    postContent: {},
    separator: {
      width: '50%',
      border: '2px, solid #939596',
      borderBottom: 'none',
      margin: '2rem auto',
    },
  })
);

const Post: React.FC<{ router: NextRouter }> = ({}) => {
  const router = useRouter();
  const postID = router?.query?.postID;
  const { data } = useQuery<getPostById>(GET_POST, {
    variables: { postID },
  });
  const post = data?.post;

  const classes = useStyles();
  let image;
  if (post?.image) {
    image = post?.image;
  } else
    image =
      'https://rent-my-boat-nice.fr/wp-content/uploads/2020/08/placeholder.png';

  return (
    <div>
      <img src={image} className={classes.media} height="250px"></img>
      <Container maxWidth="sm">
        <Box m={2}>
          <div>
            <h1>{post?.title}</h1>
            <p>written by {post?.user?.username}</p>
            <p className={classes.dateBlock}>
              <span className={classes.dateUnit}>
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
              <span className={classes.dateUnit}>
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
            <ReactMarkdown className={classes.postContent}>
              {post?.content}
            </ReactMarkdown>
          </div>
        </Box>
        <hr className={classes.separator} />
        <Comment postID={postID} />
      </Container>
    </div>
  );
};

export default Post;
