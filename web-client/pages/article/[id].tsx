import React, { useContext } from 'react';
import Article from '../../components/articles/Article';
import Comment from '../../components/articles/Comment';
import { Container, Box, Link, Button } from '@material-ui/core';
import { NextPage } from 'next';
import { NextRouter } from 'next/router';
import { UserContext } from '../../components/Contexts';
import LoginComponent from '../../components/login/Login';

interface WithRouterProps {
  router: NextRouter;
}

const ArticleView: NextPage<WithRouterProps> = ({
  router,
}: WithRouterProps) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <LoginComponent />;
  } else {
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
  }
};

export default ArticleView;
