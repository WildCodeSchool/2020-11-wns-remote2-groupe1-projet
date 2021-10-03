import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useQuery, useMutation } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { GET_POST, UPDATE_POST, DELETE_POST } from '../../src/queries';

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
  gridContainer: {
    padding: '1rem',
  },
});

const UpdatePostComponent: React.FC<{ router: NextRouter }> = ({}) => {
  const classes = useStyles();

  const router = useRouter();
  const postID = router?.query?.postID;
  const { data: queryData } = useQuery(GET_POST, {
    variables: { postID },
  });

  const post: {
    postID: string;
    title: string;
    banner: string;
    content: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
  } = queryData?.post || [];

  const [values, setValues] = useState({
    postID: '',
    title: '',
    banner: '',
    content: '',
    isPublished: null,
  });

  useEffect(() => {
    if (post) {
      setValues({
        postID: post.postID,
        title: post.title,
        banner: post.banner,
        content: post.content,
        isPublished: post.isPublished,
      });
    }
  }, [post]);

  const changeHandler = (e) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };
  const publishHandler = (e) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        isPublished: !values.isPublished,
      };
    });
  };

  const [updatePost] = useMutation(UPDATE_POST, {
    onCompleted: () => {
      router.push('/edit-posts');
    },
  });

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => {
      router.push('/edit-posts');
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    updatePost({
      variables: values,
    });
  }

  function handleDelete(e) {
    e.preventDefault();
    deletePost({ variables: { postID } });
  }

  return (
    <Paper className={classes.gridContainer}>
      <Typography align={'center'} variant="h2">
        Post Edit
      </Typography>
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
          <Grid item xs={12} md={12}>
            <TextField
              label="Content"
              name="content"
              value={values.content}
              onChange={changeHandler}
              fullWidth
              multiline
              rows={10}
              type="text"
            />
          </Grid>
          <Grid item xs={12} alignContent={'flex-start'}>
            <FormControlLabel
              control={
                <Switch
                  name="isPublished"
                  checked={values.isPublished}
                  value={values.isPublished}
                  onChange={publishHandler}
                />
              }
              label={values.isPublished ? 'Published' : 'Draft'}
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

export default UpdatePostComponent;
