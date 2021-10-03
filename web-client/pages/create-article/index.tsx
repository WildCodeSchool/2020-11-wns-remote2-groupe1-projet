import React from 'react';

import { Container, Box } from '@material-ui/core';
import CreateArticleComponent from '../../components/articles/CreateArticle';

import withAuth from '../../components/withAuth';

function CreateArticle() {
  return (
    <div>
      <Container maxWidth="sm">
        <Box mt={2}>
          <CreateArticleComponent />
        </Box>
      </Container>
    </div>
  );
}

export default withAuth(CreateArticle);
