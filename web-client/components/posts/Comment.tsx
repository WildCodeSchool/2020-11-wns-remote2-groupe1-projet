import { TextField, Button, Paper, Card } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  CREATE_COMMENT,
  GET_COMMENTS,
  SUBSCRIBE_TO_NEW_COMMENT,
} from '../../src/queries';
import { useMutation, useQuery } from '@apollo/client';
import { GetComments, SubscribeToNewComment } from '../../src/schemaTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    commentField: {
      display: 'flex',
      flexDirection: 'row',
      marginRight: '1rem',
      marginLeft: '1rem',
    },
    buttonContainer: {
      display: 'flex',
      height: '3rem',
    },
    formCard: {
      padding: '1.5rem',
      marginBottom: '1.5rem',
    },
    commentsComponent: {
      paddingBottom: '2rem',
    },
    commentCard: {
      display: 'flex',
      flexDirection: 'column',
      padding: '0.5rem',
      margin: '0.5rem',
    },
    commentBlock: {},
    commentHeader: {
      fontWeight: 'bold',
    },
    commentBody: {
      marginLeft: '1rem',
    },
  })
);

const Comment = ({ postID }): JSX.Element => {
  const [content, setContent] = useState<string>('');

  const {
    data: commentData,
    refetch,
    subscribeToMore,
  } = useQuery<GetComments>(GET_COMMENTS, {
    variables: {
      postID: postID,
    },
  });
  const comments = commentData?.comments;

  const [addComment] = useMutation(CREATE_COMMENT, {});
  const onSubmit = async (e) => {
    e.preventDefault();
    await addComment({
      variables: {
        content,
        postID: postID,
      },
    });
    setContent('');
    refetch();
  };

  const [isSubscribedToNewComment, setIsSubscribedToNewComment] =
    useState(false);
  useEffect(() => {
    if (!isSubscribedToNewComment) {
      subscribeToMore<SubscribeToNewComment>({
        document: SUBSCRIBE_TO_NEW_COMMENT,
        updateQuery: (prev, { subscriptionData }): GetComments => {
          if (!subscriptionData.data) return prev;
          return {
            comments: [...prev.comments, subscriptionData.data.newComment],
          };
        },
      });
      setIsSubscribedToNewComment(true);
    }
  }, [commentData]);

  const classes = useStyles();

  return (
    <div className={classes.commentsComponent}>
      <Card className={classes.formCard}>
        <form onSubmit={onSubmit} className={classes.commentField}>
          <TextField
            label="Add a comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            type="string"
          />
          <div className={classes.buttonContainer}>
            <Button size="small" variant="text" color="primary" type="submit">
              <SendRoundedIcon fontSize="small" />
            </Button>
          </div>
        </form>
      </Card>

      {comments && (
        <div className="comments-container">
          {comments.map((comment) => {
            return (
              <Card className={classes.commentCard} key={comment.commentID}>
                <div className={classes.commentBlock}>
                  <div className={classes.commentHeader}>
                    {comment.user.username}
                  </div>
                  <div className={classes.commentBody}>{comment.content}</div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
