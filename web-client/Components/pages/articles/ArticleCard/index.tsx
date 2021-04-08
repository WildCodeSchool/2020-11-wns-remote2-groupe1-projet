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
      maxWidth: 450,
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
  contents,
}: {
  id: string;
  title: string;
  image: string;
  contents: string;
}): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Card
          onClick={() => {
            window.location.assign(`/article/${id}`);
          }}
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
              <Typography noWrap>{contents}</Typography>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export default ArticleCard;
