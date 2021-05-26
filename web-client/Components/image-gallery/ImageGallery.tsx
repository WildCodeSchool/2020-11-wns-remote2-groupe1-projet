import React from 'react';

function ImageGallery() { 
    const data = {
        images: []
    }
  return (
    <div>
      <h1>Image Gallery</h1>
      <form><input type="file" required accept="image/*" /></form>
      {data?.images.map(({id})) => {
          <div key={id}>
              <img src={`public/media/images/${id}.jpg`}  />
          </div>
      }}
    </div>
  );
}

export default ImageGallery;
