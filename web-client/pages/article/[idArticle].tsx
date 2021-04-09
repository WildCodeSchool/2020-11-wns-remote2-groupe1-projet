import React from 'react';
import Article from '../../Components/article/article';
import Comment from '../../Components/article/comment';
import { Container, Box, Link, Button } from '@material-ui/core';

const ArticleView = (): JSX.Element => {
  return (
    <>
      <Link href="/">
        <Button color="inherit"> Retour aux articles</Button>
      </Link>
      <Container maxWidth="sm">
        <Box mt={2}>
          <Article />
        </Box>
        <Comment />
      </Container>
    </>
  );
};
export default ArticleView;
