import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Grid,
  Button,
} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import styles from '../../styles/PostCard.module.scss';

const PostCard = ({
  postID,
  title,
  image,
  content,
  isPublished,
  user,
}: {
  postID: string;
  title: string;
  image: string;
  content: string;
  isPublished: boolean;
  user: any;
}): JSX.Element => {
  const clickHandler = () => {
    return (event: React.MouseEvent) => {
      const path = window.location.pathname;

      switch (path) {
        case '/my-posts':
          window.location.assign(`/my-posts/${postID}`);
          break;
        case '/':
          window.location.assign(`/post/${postID}`);
      }
      event.preventDefault();
    };
  };
  return (
    <div>
      <Grid container>
        <Card
          onClick={clickHandler()}
          className={`${styles.root} ${styles.center}`}
        >
          {' '}
          <CardHeader
            id="card-title"
            title={
              <span className={styles.headerBlock}>
                <span className={styles.title}>{title}</span>
                <Button disabled className={styles.publishButton}>
                  {isPublished ? 'published' : 'draft'}
                </Button>
              </span>
            }
            avatar={
              <Avatar aria-label="recipe" className={styles.avatar}>
                R
              </Avatar>
            }
          />
          {image ? (
            <CardMedia className={styles.media} image={image} />
          ) : (
            <CardMedia
              className={styles.media}
              image="https://rent-my-boat-nice.fr/wp-content/uploads/2020/08/placeholder.png"
            />
          )}
          <Grid item zeroMinWidth>
            <CardContent>
              <p>by {user?.username}</p>

              <div>
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export default PostCard;
