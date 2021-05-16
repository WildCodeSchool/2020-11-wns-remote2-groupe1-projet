import React from 'react';
import UpdateArticleComponent from '../../Components/article/article';
import { Container, Box, Link, Button } from '@material-ui/core';
import { NextPage } from 'next';
import { NextRouter } from 'next/router';

interface WithRouterProps {
  router: NextRouter;
}

const EditArticle: NextPage<WithRouterProps> = ({
  router,
}: WithRouterProps) => {
  return (
    <>
      <Container maxWidth="sm">
        <Box mt={2}>
          <UpdateArticleComponent router={router} />
        </Box>
      </Container>
    </>
  );
};

export default EditArticle;
