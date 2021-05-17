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
  mutation UpdateArticle($title: String!, $banner: String!, $content: String!) {
    updateArticle(
      id: $id
      data: { title: $title, banner: $banner, content: $content }
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

  const [values, setValues] = useState({
    title: '',
    banner: '',
    content: '',
  });

  useEffect(() => {
    if (article) {
      setValues({
        title: article.title,
        banner: article.banner,
        content: article.content,
      });
    }
  }, [article]);

  const changeHandler = (e) => {
    setValues((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const [updateArticle, { error }] = useMutation(UPDATE_ARTICLE, {
    onCompleted: () => {
      router.push('/edit-articles');
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await updateArticle({
      variables: {
        ...values,
      },
    });
  }

  console.log('article: ', values);

  return (
    <Paper>
      <Typography variant="h2">Article Edit</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Title"
              name="title"
              value={values.title}
              onChange={changeHandler}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Banner"
              name="banner"
              value={values.banner}
              onChange={changeHandler}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Content"
              name="content"
              value={values.content}
              onChange={changeHandler}
              fullWidth
              type="text"
            />
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
