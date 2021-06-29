import { Box } from '@material-ui/core';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const GET_ARTICLE = gql`
  query getArticleById($id: String!) {
    article(id: $id) {
      id
      title
      banner
      content
      createdAt
      updatedAt
    }
  }
`;

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
  const id = router?.query?.idArticle;
  const { data } = useQuery(GET_ARTICLE, { variables: { id } });
  const article: {
    id: string;
    title: string;
    banner: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  } = data?.article || [];

  const classes = useStyles();

  return (
    <Box m={2}>
      <div>
        <img
          src={article?.banner}
          className={classes.media}
          height="250px"
        ></img>
        <h1>{article?.title}</h1>
        <p>{article?.content}</p>
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
      </div>
    </Box>
  );
};

export default Article;
