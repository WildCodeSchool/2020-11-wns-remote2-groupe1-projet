import React from 'react';

const PictureGallery = (): JSX.Element => {
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
            <img src={`/media/pictures/${id}`} />
          </div>
        ))}
      </div>
    </>
  );
};

export default PictureGallery;
