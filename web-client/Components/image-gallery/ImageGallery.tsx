import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { API_BASE_URL } from '../../config';
import { GetImages, UploadImage } from '../../src/schemaTypes';

export const GET_IMAGES = gql`
  query GetImages {
    images {
      id
      extension
    }
  }
`;

const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      id
      extension
    }
  }
`;

function ImageGalleryComponent() {
  const { loading, error, data } = useQuery<GetImages>(GET_IMAGES);
  const [mutate] = useMutation<UploadImage>(UPLOAD_IMAGE);

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
          const existingData: GetImages | null = cache.readQuery({
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
      <h1>Image Gallery</h1>
      <form>
        <input
          type="file"
          id="file"
          required
          accept="image/*"
          onChange={uploadImage}
        />
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error.</div>
      ) : (
        <div>
          {data?.images.map(({ id, extension }) => (
            <div key={id}>
              <img
                src={`${API_BASE_URL}/public/media/pictures/${id}${extension}`}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ImageGalleryComponent;
