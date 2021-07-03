import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GetPictures, UploadPicture } from '../../src/schemaTypes';

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

const UPLOAD_PICTURE = gql`
  mutation UploadPicture($file: Upload!) {
    uploadPicture(file: $file) {
      id
    }
  }
`;

const GET_PICTURES = gql`
  query GetPictures {
    pictures {
      id
      extension
    }
  }
`;

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

    validity.valid && mutate({ variables: { file } });
  };
  return (
    <>
      <h1>Galerie</h1>
      <input
        type="file"
        id="file"
        required
        accept="image/*"
        onChange={uploadPicture}
      />
      <label htmlFor="file">Ajouter une image</label>

      <div className={classes.gallery}>
        {loading ? (
          <div> Loading...</div>
        ) : error ? (
          <div>Error.</div>
        ) : (
          data?.pictures.map(({ id, extension }) => (
            <div key={id}>
              <img
                className={classes.image}
                src={`http://localhost:4000/public/media/pictures/${id}${extension}`}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default PictureGalleryComponent;
