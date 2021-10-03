import React, { useContext } from 'react';
import UpdateArticleComponent from '../../components/articles/UpdateArticle';
import { Container, Box } from '@material-ui/core';
import { NextPage } from 'next';
import { NextRouter } from 'next/router';
import { UserContext } from '../../contexts/Contexts';
import withAuth from '../../components/withAuth';

interface WithRouterProps {
  router: NextRouter;
}

const EditArticle: NextPage<WithRouterProps> = ({
  router,
}: WithRouterProps) => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <Container maxWidth="sm">
        <Box mt={2}>
          <UpdateArticleComponent router={router} />
        </Box>
      </Container>
    </>
  );
};

export default withAuth(EditArticle);
