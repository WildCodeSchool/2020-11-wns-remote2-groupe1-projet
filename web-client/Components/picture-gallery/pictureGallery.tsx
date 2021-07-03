import React from 'react';

const PictureGalleryComponent = (): JSX.Element => {
  const data = {
    pictures: [],
  };

  return (
    <>
      <h1>Galerie</h1>
      <input type="file" id="file" required accept="image/*" />
      <label htmlFor="file">Ajouter une image</label>
      <div>
        {data?.pictures.map(({ id }) => (
          <div key={id}>
            <img src={`/media/pictures/${id}.jpg`} />
          </div>
        ))}
      </div>
    </>
  );
};

export default PictureGalleryComponent;
