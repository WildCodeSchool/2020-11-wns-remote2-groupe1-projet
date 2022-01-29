import { TextField } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import React, { useEffect, useState } from 'react';
import {
  CREATE_COMMENT,
  GET_COMMENTS,
  SUBSCRIBE_TO_NEW_COMMENT,
} from '../../src/queries';
import { useMutation, useQuery } from '@apollo/client';
import { GetComments, SubscribeToNewComment } from '../../src/schemaTypes';
import styles from '../../styles/Comment.module.scss';

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
    fetchPolicy: 'cache-and-network',
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

  return (
    <div className={styles.commentsComponent}>
      <div className={styles.formCard}>
        <form onSubmit={onSubmit} className={styles.commentField}>
          <TextField
            label="Add a comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            type="string"
          />
          <div className={styles.buttonContainer}>
            <button className={styles.sendButton}>
              <SendRoundedIcon fontSize="small" />
            </button>
          </div>
        </form>
      </div>

      {comments && (
        <div className="comments-container">
          {comments.map((comment) => {
            return (
              <div className={styles.commentCard} key={comment.commentID}>
                <div className={styles.commentBlock}>
                  <div className={styles.commentHeader}>
                    <span className={styles.commentUser}>
                      {comment.user.username}
                    </span>{' '}
                    <span>
                      {new Date(comment?.createdAt).toLocaleString('fr', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className={styles.commentBody}>{comment.content}</div>
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
