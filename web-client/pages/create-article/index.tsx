import React, { useContext } from 'react';

import { Container, Box, Link, Button } from '@material-ui/core';
import CreateArticleComponent from '../../components/articles/CreateArticle';
import LoginComponent from '../../components/login/Login';
import { UserContext } from '../../components/Contexts';

export default function CreateArticle() {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <LoginComponent />;
  } else {
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
}
