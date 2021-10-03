import React, { useContext, useEffect } from 'react';

import { Container, Box, Link, Button } from '@material-ui/core';
import CreateArticleComponent from '../../components/articles/CreateArticle';
import LoginComponent from '../../components/login/Login';
import { UserContext } from '../../contexts/Contexts';
import { useRouter } from 'next/router';

export default function CreateArticle() {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();

  // useEffect(() => {
  //   if (!currentUser) {
  //     router.push(`/login`);
  //   }
  // }, []);

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
