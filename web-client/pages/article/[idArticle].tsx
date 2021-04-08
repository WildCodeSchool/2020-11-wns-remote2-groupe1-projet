import React from 'react';
import Article from '../../Components/pages/article/article';
import Comment from '../../Components/pages/article/comment';
import { Container, Box } from '@material-ui/core';

const ArticleView = (): JSX.Element => {
  return (
    <>
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
