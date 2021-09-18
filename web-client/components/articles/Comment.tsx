import { TextField, Button, Paper } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CREATE_COMMENT, GET_COMMENTS } from '../../src/queries';
import { useMutation, useQuery } from '@apollo/client';

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

const Comment = (id): JSX.Element => {
  const [content, setContent] = useState<string>('');

  const { data: commentData, refetch } = useQuery(GET_COMMENTS, {
    variables: {
      // article_id: id,
    },
  });
  const comments = commentData?.comments;

  const [addComment, { data }] = useMutation(CREATE_COMMENT, {});

  const onSubmit = async (e) => {
    e.preventDefault();
    await addComment({
      variables: {
        content,
      },
    });
    refetch();
  };

  const classes = useStyles();
  console.log(comments);
  return (
    <div>
      <form onSubmit={onSubmit} className={classes.commentField}>
        <TextField
          label="Ajouter un commentaire"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          type="string"
        />
        <Button variant="contained" color="primary" type="submit">
          <SendRoundedIcon />
        </Button>
      </form>

      {comments && (
        <div className="comments-container">
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <div className="comment-block">
                  <div className="comment-header">{comment.user.firstName}</div>
                  <div className="comment-content">{comment.content}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
