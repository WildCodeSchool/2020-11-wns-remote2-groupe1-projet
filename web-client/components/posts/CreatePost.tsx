import { useMutation } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { useRouter } from 'next/router';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/Contexts';
import { CREATE_POST } from '../../src/queries';
import styles from '../../styles/CreatePost.module.scss';

function CreatePostComponent(): JSX.Element {
  const { currentUser } = useContext(UserContext);

  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: () => {
      router.push('/');
    },
  });
  return (
    <Paper className={styles.gridContainer}>
      <h2>Post Creation</h2>
      <p>{currentUser?.firstName}</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createPost({
            variables: {
              title,
              image,
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
              label="Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
                  onChange={() => {
                    isPublished ? setIsPublished(false) : setIsPublished(true);
                  }}
                />
              }
              label={isPublished ? 'Published' : 'Draft'}
            />
          </Grid>
          <Grid item xs={12} md={12} className={styles.buttons}>
            <button className={styles.submitBtn} type="submit">
              Submit post
            </button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default CreatePostComponent;
