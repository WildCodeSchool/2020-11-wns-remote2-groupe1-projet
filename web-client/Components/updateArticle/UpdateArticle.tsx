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

const UpdateArticleComponent: React.FC<{ router: NextRouter }> = ({
  router,
}) => {
  const id = router?.query?.idArticle;
  const { data } = useQuery(GET_ARTICLE, { variables: { id } });
  const article = data?.article;

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

export default UpdateArticleComponent;
