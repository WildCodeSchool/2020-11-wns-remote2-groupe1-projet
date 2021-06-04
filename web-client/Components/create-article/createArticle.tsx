import { gql, useMutation, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { UserContext } from '../AppProviders/UserContext';

const CREATE_ARTICLE = gql`
  # Create Article
  mutation CreateArticle(
    $title: String!
    $banner: String!
    $content: String!
    $isVisible: Boolean!
    $author: User!
  ) {
    createArticle(
      data: {
        title: $title
        banner: $banner
        content: $content
        isVisible: $isVisible
        author: $author
      }
    ) {
      title
      banner
      content
      isVisible
      author
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

function CreateArticleComponent(): JSX.Element {
  const router = useRouter();
  const { me } = useContext(UserContext);
  const classes = useStyles();
  const [title, setTitle] = useState<string>('');
  const [banner, setBanner] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [createArticle, { error }] = useMutation(CREATE_ARTICLE, {
    onCompleted: () => {
      router.push('/');
    },
  });
  return (
    <Paper>
      <Typography variant="h2">Article Creation</Typography>
      <p>{me?.firstName}</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createArticle({
            variables: {
              title,
              banner,
              content,
              isVisible,
              author: me?.id,
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
              Submit article
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default CreateArticleComponent;
