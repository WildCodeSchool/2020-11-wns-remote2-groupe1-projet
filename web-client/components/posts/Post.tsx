import { Box } from '@material-ui/core';
import React from 'react';
import { useQuery } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { GET_POST } from '../../src/queries';
import { getPostById } from '../../src/schemaTypes';
import Comment from './Comment';

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
      <Box m={2}>
        <div>
          <img src={image} className={classes.media} height="250px"></img>
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
          <p>{post?.content}</p>
        </div>
      </Box>
      <Comment postID={postID} />
    </div>
  );
};

export default Post;
