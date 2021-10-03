import React, { useContext, useEffect } from 'react';
import Post from '../../components/posts/Post';
import Comment from '../../components/posts/Comment';
import { Container, Box, Link, Button } from '@material-ui/core';
import { NextPage } from 'next';
import { NextRouter } from 'next/router';
import { UserContext } from '../../contexts/Contexts';
import LoginComponent from '../../components/login/Login';
import withAuth from '../../components/withAuth';

interface WithRouterProps {
  router: NextRouter;
}

const PostView: NextPage<WithRouterProps> = ({ router }: WithRouterProps) => {
  return (
    <>
      <Link href="/">
        <Button color="inherit"> Retour aux posts</Button>
      </Link>
      <Container maxWidth="sm">
        <Box mt={2}>
          <Post router={router} />
        </Box>
      </Container>
    </>
  );
};

export default withAuth(PostView);
