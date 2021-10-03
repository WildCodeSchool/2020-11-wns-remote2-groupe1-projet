import React, { useContext, useEffect } from 'react';
import Article from '../../components/articles/Article';
import Comment from '../../components/articles/Comment';
import { Container, Box, Link, Button } from '@material-ui/core';
import { NextPage } from 'next';
import { NextRouter } from 'next/router';
import { UserContext } from '../../contexts/Contexts';
import LoginComponent from '../../components/login/Login';

interface WithRouterProps {
  router: NextRouter;
}

const ArticleView: NextPage<WithRouterProps> = ({
  router,
}: WithRouterProps) => {
  const { currentUser } = useContext(UserContext);

  // useEffect(() => {
  // if (!currentUser) {
  //  router.push(`/login`);
  //}
  //}, []);

  return (
    <>
      <Link href="/">
        <Button color="inherit"> Retour aux articles</Button>
      </Link>
      <Container maxWidth="sm">
        <Box mt={2}>
          <Article router={router} />
        </Box>
      </Container>
    </>
  );
};

export default ArticleView;
