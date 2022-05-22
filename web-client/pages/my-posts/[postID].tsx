import React from 'react';
import UpdatePostComponent from '../../components/posts/UpdatePost';
import { Container, Box } from '@material-ui/core';
import { NextPage } from 'next';
import { NextRouter } from 'next/router';
import withAuth from '../../components/withAuth';

interface WithRouterProps {
  router: NextRouter;
}

const EditPost: NextPage<WithRouterProps> = ({ router }: WithRouterProps) => {
  return (
    <>
      <Container maxWidth="sm">
        <Box mt={2}>
          <UpdatePostComponent router={router} />
        </Box>
      </Container>
    </>
  );
};

export default withAuth(EditPost);
