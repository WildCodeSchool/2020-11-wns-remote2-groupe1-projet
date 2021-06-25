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
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 450,
    },
    media: {
      height: 140,
      width: '100%',
      paddingTop: '56.25%', // 16:9
    },
    center: {
      margin: 'auto',
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
  id,
  title,
  image,
  content,
}: {
  id: string;
  title: string;
  image: string;
  content: string;
}): JSX.Element => {
  const classes = useStyles();

  const clickHandler = () => {
    return (event: React.MouseEvent) => {
      const path = window.location.pathname;

      switch (path) {
        case '/edit-articles':
          window.location.assign(`/edit-articles/${id}`);
          break;
        case '/':
          window.location.assign(`/article/${id}`);
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
            title={title}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
          />
          <CardMedia className={classes.media} image={image} />
          <Grid item zeroMinWidth>
            <CardContent>
              <Typography noWrap>{content}</Typography>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export default ArticleCard;
