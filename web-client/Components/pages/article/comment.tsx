import { TextField, Button, Paper } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import React, { useState } from 'react';

const Comment = (): JSX.Element => {
  const [comment, setComment] = useState<string>('');

  return (
    <Paper>
      <form>
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
    </Paper>
  );
};

export default Comment;
