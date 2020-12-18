import React from 'react';
import { ArticleType } from '../../types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const webImage =
  'https://st.depositphotos.com/1005682/2476/i/600/depositphotos_24762569-stock-photo-fast-food-hamburger-hot-dog.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      width: '100%',
      paddingTop: '56.25%', // 16:9
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
      backgroundColor: red[500],
    },
  })
);

const ArticleCard = ({ title, image, contents }: ArticleType): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <Card className="article-card">
        <CardHeader
          id="card-title"
          title={title}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
        />
        <CardMedia>
          <img src={webImage} />
        </CardMedia>
        <CardContent>{contents}</CardContent>
      </Card>
    </div>
  );
};

export default ArticleCard;
