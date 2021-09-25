import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 450,
      cursor: 'pointer',
    },
    media: {
      height: 140,
      width: '100%',
      paddingTop: '56.25%', // 16:9
    },
    publishButton: {
      display: 'inline-block',
    },
    title: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    center: {
      margin: 'auto',
    },
    headerBlock: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: grey[500],
    },
  })
);

const ArticleCard = ({
  articleID,
  title,
  image,
  content,
  isPublished,
  user,
}: {
  articleID: string;
  title: string;
  image: string;
  content: string;
  isPublished: boolean;
  user: any;
}): JSX.Element => {
  const classes = useStyles();

  const clickHandler = () => {
    return (event: React.MouseEvent) => {
      const path = window.location.pathname;

      switch (path) {
        case '/edit-articles':
          window.location.assign(`/edit-articles/${articleID}`);
          break;
        case '/':
          window.location.assign(`/article/${articleID}`);
      }
      event.preventDefault();
    };
  };
  return (
    <div>
      <Grid container>
        <Card
          onClick={clickHandler()}
          className={`${classes.root} ${classes.center}`}
        >
          {' '}
          <CardHeader
            id="card-title"
            title={
              <span className={classes.headerBlock}>
                <span className={classes.title}>{title}</span>
                <Button disabled className={classes.publishButton}>
                  {isPublished ? 'published' : 'draft'}
                </Button>
              </span>
            }
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
          />
          {image ? (
            <CardMedia className={classes.media} image={image} />
          ) : (
            <CardMedia
              className={classes.media}
              image="https://rent-my-boat-nice.fr/wp-content/uploads/2020/08/placeholder.png"
            />
          )}
          <Grid item zeroMinWidth>
            <CardContent>
              <p>by {user?.firstName}</p>

              <Typography noWrap>{content}</Typography>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export default ArticleCard;
