import React from 'react';

import { Container, Box } from '@material-ui/core';
import CreatePostComponent from '../../components/posts/CreatePost';

import withAuth from '../../components/withAuth';

function CreatePost() {
  return (
    <div>
      <Container maxWidth="sm">
        <Box mt={2}>
          <CreatePostComponent />
        </Box>
      </Container>
    </div>
  );
}

export default withAuth(CreatePost);
