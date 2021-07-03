import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  image: {
    width: '100%',
    margin: '1rem',
  },
  gallery: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  feedTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1b84c1',
  },
  feedButton: {
    display: 'block',
    margin: '2rem auto 2rem auto',
  },
}));

const PictureGalleryComponent = (): JSX.Element => {
  const classes = useStyles();

  const data = {
    pictures: [{ id: 'dock-boat' }, { id: 'mtn-trees' }],
  };
  console.log(data);
  return (
    <>
      <h1>Galerie</h1>
      <input type="file" id="file" required accept="image/*" />
      <label htmlFor="file">Ajouter une image</label>
      <div className={classes.gallery}>
        {data?.pictures.map(({ id }) => (
          <div key={id}>
            <img
              className={classes.image}
              src={`http://localhost:4000/public/media/pictures/${id}.jpeg`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PictureGalleryComponent;
