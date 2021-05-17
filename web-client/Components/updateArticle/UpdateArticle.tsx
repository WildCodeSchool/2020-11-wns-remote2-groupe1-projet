import { useState, useEffect, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { gql, useQuery, useMutation } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';

const GET_ARTICLE = gql`
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
    $updatedAt: Date!
    $createdAt: Date!
  ) {
    updateArticle(
      id: $id
      data: {
        title: $title
        banner: $banner
        content: $content
        isVisible: $isVisible
        updatedAt: $updatedAt
        createdAt: $createdAt
      }
    )
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
  const classes = useStyles();

  const router = useRouter();
  const id = router?.query?.id;
  const { data } = useQuery(GET_ARTICLE, { variables: { id } });
  const article: {
    id: string;
    title: string;
    banner: string;
    content: string;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
  } = data?.article || [];

  const [title, setTitle] = useState<string>('');
  const [banner, setBanner] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>();
  const [updatedAt, setUpdatedAt] = useState<Date>();
  const [createdAt, setCreatedAt] = useState<Date>();
  const [updateArticle] = useMutation(UPDATE_ARTICLE);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setBanner(article.banner);
      setContent(article.content);
      setIsVisible(article.isVisible);
      setUpdatedAt(article.updatedAt);
      setCreatedAt(article.createdAt);
    }
  }, [article]);

  console.log('article: ', article.title);

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
              updatedAt,
              createdAt,
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
            <TextField
              label="UpdatedAt"
              value={updatedAt}
              onChange={(e) => setUpdatedAt(updatedAt)}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="CreatedAt"
              value={createdAt}
              onChange={(e) => setUpdatedAt(createdAt)}
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
