import { Box } from '@material-ui/core';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';

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

const Article: React.FC<{ router: NextRouter }> = ({}) => {
  const router = useRouter();
  const id = router?.query?.idArticle;
  const { data } = useQuery(GET_ARTICLE, { variables: { id } });
  console.log('id: ', id);
  const article: {
    id: string;
    title: string;
    banner: string;
    content: string;
    createdAt: string;
  } = data?.article || [];

  console.log(' article:', article);
  return (
    <Box m={2}>
      <div>
        <img src={article?.banner} width="450px" height="250px"></img>
        <h1>{article?.title}</h1>
        <p>{article?.content}</p>
        <p>
          <small>{article?.createdAt}</small>
        </p>
      </div>
    </Box>
  );
};

export default Article;
