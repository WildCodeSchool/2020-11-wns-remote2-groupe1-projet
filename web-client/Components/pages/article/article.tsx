import { Box } from '@material-ui/core';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export const GET_ARTICLE = gql`
  query getArticleById($id: String!) {
    article(id: $id) {
      id
      title
      banner
      content
      createAt
      updateAt
    }
  }
`;

const Article = (): JSX.Element => {
  const router = useRouter();
  const id = router?.query?.idArticle;
  const { data } = useQuery(GET_ARTICLE, { variables: { id } });
  const article = data?.article;

  return (
    <Box m={2}>
      <div>
        <img src={article?.banner}></img>
        <h1>{article?.title}</h1>
        <p>{article?.content}</p>
        <p>
          <small>{article?.createAt}</small>
        </p>
      </div>
    </Box>
  );
};

export default Article;
