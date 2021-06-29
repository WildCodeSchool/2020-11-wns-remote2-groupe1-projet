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
    $id: String!
    $title: String!
    $banner: String!
    $content: String!
  ) {
    updateArticle(
      id: $id
      data: { title: $title, banner: $banner, content: $content }
    ) {
      id
      title
      banner
      content
    }
  }
`;

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: String!) {
    deleteArticle(id: $id)
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
  const { data: queryData } = useQuery(GET_ARTICLE, { variables: { id } });

  const article: {
    id: string;
    title: string;
    banner: string;
    content: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
  } = queryData?.article || [];

  const [values, setValues] = useState({
    id: '',
    title: '',
    banner: '',
    content: '',
  });

  useEffect(() => {
    if (article) {
      setValues({
        id: article.id,
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

  const [updateArticle] = useMutation(UPDATE_ARTICLE, {
    onCompleted: () => {
      router.push('/edit-articles');
    },
  });

  const [deleteArticle] = useMutation(DELETE_ARTICLE, {
    onCompleted: () => {
      router.push('/edit-articles');
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    updateArticle({
      variables: {
        ...values,
      },
    });
  }

  function handleDelete(e) {
    e.preventDefault();
    deleteArticle({ variables: { id } });
  }

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
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UpdateArticleComponent;
