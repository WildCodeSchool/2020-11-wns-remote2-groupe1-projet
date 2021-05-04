import React from 'react';
import Article from '../../Components/article/article';
import Comment from '../../Components/article/comment';
import { Container, Box, Link, Button } from '@material-ui/core';
import { NextPage } from 'next';
import { NextRouter } from 'next/router';

const ArticleView: NextPage<{ router: NextRouter }> = ({ router }) => {
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
