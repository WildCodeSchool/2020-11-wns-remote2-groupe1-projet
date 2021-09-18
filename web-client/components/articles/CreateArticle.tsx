import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { useRouter } from 'next/router';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/Contexts';
import { CREATE_ARTICLE } from '../../src/queries';

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

function CreateArticleComponent(): JSX.Element {
  const { currentUser } = useContext(UserContext);

  const router = useRouter();
  const classes = useStyles();
  const [title, setTitle] = useState<string>('');
  const [banner, setBanner] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [createArticle, { error }] = useMutation(CREATE_ARTICLE, {
    onCompleted: () => {
      router.push('/');
    },
  });
  return (
    <Paper className={classes.gridContainer}>
      <Typography align={'center'} variant="h2">
        Article Creation
      </Typography>
      <p>{currentUser?.firstName}</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createArticle({
            variables: {
              title,
              banner,
              content,
              isPublished,
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
          <Grid item xs={12} md={12}>
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
                  onChange={(e) => {
                    isPublished ? setIsPublished(false) : setIsPublished(true);
                  }}
                />
              }
              label={isPublished ? 'Published' : 'Draft'}
            />
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