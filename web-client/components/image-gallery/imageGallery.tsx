import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import { GetImages, UploadImage } from '../../src/schemaTypes';
import { GET_IMAGES, UPLOAD_IMAGE, DELETE_IMAGE } from '../../src/queries';
import router from 'next/router';

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

const ImageGalleryComponent = (): JSX.Element => {
  const classes = useStyles();
  const baseUrl =
    process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:4000';

  const { loading, error, data } = useQuery<GetImages>(GET_IMAGES);

  const [mutate] = useMutation<UploadImage>(UPLOAD_IMAGE);
  const [deleteImage] = useMutation(DELETE_IMAGE, {
    onCompleted: () => {
      router.push('/image-gallery');
    },
  });

  const uploadImage = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    validity.valid &&
      mutate({
        variables: { file },
        update: (cache, { data }) => {
          const existingData: GetImages = cache.readQuery({
            query: GET_IMAGES,
          });
          if (existingData && data) {
            cache.writeQuery({
              query: GET_IMAGES,
              data: {
                ...existingData,
                images: [...existingData.images, data.uploadImage],
              },
            });
          }
        },
      });
  };
  return (
    <>
      <h1 className={classes.galleryTitle}>Image Gallery</h1>
      <input
        type="file"
        id="file"
        required
        accept="image/*"
        hidden
        onChange={uploadImage}
      />
      <Button
        className={classes.uploadButton}
        color="primary"
        variant="contained"
        size="small"
      >
        <label htmlFor="file">Add a image</label>
      </Button>

      <div className={classes.gallery}>
        {loading ? (
          <div> Loading...</div>
        ) : error ? (
          <div>Error.</div>
        ) : (
          data?.images.map(({ id, extension }) => (
            <div key={id}>
              <Card className={classes.imageCard}>
                <CardContent className={classes.cardContent}>
                  <img
                    className={classes.image}
                    src={`${baseUrl}/public/media/images/${id}${extension}`}
                  />
                  <Button
                    className={classes.deleteBtn}
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={(e) => {
                      deleteImage({ variables: { id: id } });
                    }}
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

export default ImageGalleryComponent;
