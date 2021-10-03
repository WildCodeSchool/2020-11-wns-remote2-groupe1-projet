import React, { useContext, useEffect } from 'react';
import UpdateArticleComponent from '../../components/articles/UpdateArticle';
import { Container, Box, Link, Button } from '@material-ui/core';
import { NextPage } from 'next';
import { NextRouter } from 'next/router';
import { UserContext } from '../../contexts/Contexts';

interface WithRouterProps {
  router: NextRouter;
}

const EditArticle: NextPage<WithRouterProps> = ({
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
      <Container maxWidth="sm">
        <Box mt={2}>
          <UpdateArticleComponent router={router} />
        </Box>
      </Container>
    </>
  );
};

export default EditArticle;
