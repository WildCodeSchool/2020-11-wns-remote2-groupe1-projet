import React from 'react';
import Article from '../../components/articles/Article';
import Comment from '../../components/articles/Comment';
import { Container, Box, Link, Button } from '@material-ui/core';
import { NextPage } from 'next';
import { NextRouter } from 'next/router';

interface WithRouterProps {
  router: NextRouter;
}

const ArticleView: NextPage<WithRouterProps> = ({
  router,
}: WithRouterProps) => {
  return (
    <>
      <Link href="/">
        <Button color="inherit"> Retour aux articles</Button>
      </Link>
      <Container maxWidth="sm">
        <Box mt={2}>
          <Article router={router} />
        </Box>
        <Comment />
      </Container>
    </>
  );
};

export default ArticleView;
