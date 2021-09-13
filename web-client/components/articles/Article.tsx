import { Box } from '@material-ui/core';
import React from 'react';
import { useQuery } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { GET_ARTICLE } from '../../src/queries';
import { getArticleById } from '../../src/schemaTypes';
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

const Article: React.FC<{ router: NextRouter }> = ({}) => {
  const router = useRouter();
  const id = router?.query?.id;
  const { data } = useQuery<getArticleById>(GET_ARTICLE, {
    variables: { id },
  });
  const article = data?.article;

  const classes = useStyles();

  let banner;
  if (article?.banner) {
    banner = article?.banner;
  } else
    banner =
      'https://rent-my-boat-nice.fr/wp-content/uploads/2020/08/placeholder.png';

  return (
    <div>
      <Box m={2}>
        <div>
          <img src={banner} className={classes.media} height="250px"></img>
          <h1>{article?.title}</h1>
          <p>written by {article?.user?.firstName}</p>
          <p className={classes.dateBlock}>
            <span className={classes.dateUnit}>
              Created at :
              <span>
                {new Date(article?.createdAt).toLocaleString('fr', {
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
                {new Date(article?.updatedAt).toLocaleString('fr', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}{' '}
              </span>
            </span>
          </p>
          <p>{article?.content}</p>
        </div>
      </Box>
      <Comment id={id} />
    </div>
  );
};

export default Article;
