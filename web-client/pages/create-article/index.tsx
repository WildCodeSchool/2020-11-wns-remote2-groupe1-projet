import { Container, Box, Link, Button } from '@material-ui/core';
import CreateArticleComponent from '../../Components/create-article/createArticle';

export default function CreateArticle() {
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
