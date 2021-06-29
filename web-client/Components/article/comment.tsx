import { TextField, Button, Paper } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import theme from '../../src/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    commentField: {
      display: 'flex',
      flexDirection: 'row',
      marginRight: '1rem',
      marginLeft: '1rem',
    },
  })
);

const Comment = (): JSX.Element => {
  const [comment, setComment] = useState<string>('');

  const classes = useStyles();

  return (
    <form className={classes.commentField}>
      <TextField
        label="Ajouter un commentaire"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        type="string"
      />
      <Button variant="contained" color="primary" type="submit">
        <SendRoundedIcon />
      </Button>
    </form>
  );
};

export default Comment;
