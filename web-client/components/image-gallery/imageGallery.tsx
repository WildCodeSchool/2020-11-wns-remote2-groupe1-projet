import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import { GetImages, UploadImage } from '../../src/schemaTypes';
import { GET_IMAGES, UPLOAD_IMAGE, DELETE_IMAGE } from '../../src/queries';
import router from 'next/router';
import styles from '../../styles/ImageGallery.module.scss';

const ImageGalleryComponent = (): JSX.Element => {
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
      <h1 className={styles.galleryTitle}>Image Gallery</h1>
      <div>
        <input
          type="file"
          id="file"
          required
          accept="image/*"
          hidden
          onChange={uploadImage}
        />
        <label className={styles.uploadButton} htmlFor="file">
          Add a image
        </label>
      </div>

      <div className={styles.gallery}>
        {loading ? (
          <div> Loading...</div>
        ) : error ? (
          <div>Error.</div>
        ) : (
          data?.images.map(({ id, extension }) => (
            <div key={id}>
              <Card className={styles.imageCard}>
                <CardContent className={styles.cardContent}>
                  <img
                    className={styles.image}
                    src={`${baseUrl}/public/media/images/${id}${extension}`}
                  />
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      deleteImage({ variables: { id: id } });
                    }}
                  >
                    Delete
                  </button>
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
