import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { gql, useQuery, useMutation } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';

export const GET_ARTICLE = gql`
  query getArticleById($id: String!) {
    article(id: $id) {
      id
      title
      banner
      content
      createdAt
      updatedAt
    }
  }
`;
const UPDATE_ARTICLE = gql`
  # Update Article
  mutation UpdateArticle(
    $title: String!
    $banner: String!
    $content: String!
    $isVisible: Boolean!
  ) {
    updateArticle(
      data: {
        title: $title
        banner: $banner
        content: $content
        isVisible: $isVisible
      }
    ) {
      title
      banner
      content
      isVisible
    }
  }
`;

const useStyles = makeStyles({
  root: {
    padding: 32,
    maxWidth: 600,
    margin: 'auto',
    marginTop: 64,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const UpdateArticleComponent: React.FC<{ router: NextRouter }> = ({}) => {
  const router = useRouter();
  const id = router?.query?.id;
  const { data } = useQuery(GET_ARTICLE, { variables: { id } });
  const article: {
    id: string;
    title: string;
    banner: string;
    content: string;
    createdAt: string;
  } = data?.article || [];
  console.log(' article:', article);

  const classes = useStyles();
  const [title, setTitle] = useState<string>(article.title);
  const [banner, setBanner] = useState<string>(article.banner);
  const [content, setContent] = useState<string>(article.content);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [updateArticle, { error }] = useMutation(UPDATE_ARTICLE, {
    onCompleted: () => {
      router.push('/');
    },
  });

  return (
    <Paper>
      <Typography variant="h2">Article Edit</Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await updateArticle({
            variables: {
              title,
              banner,
              content,
              isVisible,
            },
          });
        }}
      >
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Banner"
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              type="button"
              onClick={(e) => {
                isVisible ? setIsVisible(false) : setIsVisible(true);
              }}
            >
              {' '}
              {isVisible ? 'Visible' : 'Invisible'}
            </Button>
          </Grid>
          <Grid item xs={12} md={12} className={classes.buttons}>
            <Button variant="contained" color="primary" type="submit">
              Save Edits
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UpdateArticleComponent;
