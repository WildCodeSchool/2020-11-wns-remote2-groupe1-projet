import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import { GetPictures, UploadPicture } from '../../src/schemaTypes';
import { GET_PICTURES, UPLOAD_PICTURE } from '../../src/queries';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  imageCard: {
    margin: '1rem',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '23rem',
      maxHeight: '23rem',
    },
  },
  uploadButton: {
    cursor: 'pointer',
    display: 'block',
    margin: '2rem auto 2rem auto',
    width: '10rem',
    textAlign: 'center',
  },
  gallery: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 'auto',
    width: '90vw',
  },
  galleryTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1b84c1',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  deleteBtn: {
    backgroundColor: '#ffa4a2',
    width: '10rem',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: '1rem',
  },
}));

const PictureGalleryComponent = (): JSX.Element => {
  const classes = useStyles();

  const { loading, error, data } = useQuery<GetPictures>(GET_PICTURES);

  const [mutate] = useMutation<UploadPicture>(UPLOAD_PICTURE);

  const uploadPicture = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    console.log({ file, validity });

    validity.valid &&
      mutate({
        variables: { file },
        update: (cache, { data }) => {
          const existingData: GetPictures = cache.readQuery({
            query: GET_PICTURES,
          });
          if (existingData && data) {
            cache.writeQuery({
              query: GET_PICTURES,
              data: {
                ...existingData,
                pictures: [...existingData.pictures, data.uploadPicture],
              },
            });
          }
        },
      });
  };
  return (
    <>
      <h1 className={classes.galleryTitle}>Picture Gallery</h1>
      <input
        type="file"
        id="file"
        required
        accept="image/*"
        hidden
        onChange={uploadPicture}
      />
      <Button
        className={classes.uploadButton}
        color="primary"
        variant="contained"
        size="small"
      >
        <label htmlFor="file">Add a picture</label>
      </Button>

      <div className={classes.gallery}>
        {loading ? (
          <div> Loading...</div>
        ) : error ? (
          <div>Error.</div>
        ) : (
          data?.pictures.map(({ id, extension }) => (
            <div key={id}>
              <Card className={classes.imageCard}>
                <CardContent className={classes.cardContent}>
                  <img
                    className={classes.image}
                    src={`http://localhost:4000/public/media/pictures/${id}${extension}`}
                  />
                  <Button
                    className={classes.deleteBtn}
                    color="primary"
                    variant="contained"
                    size="small"
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default PictureGalleryComponent;
