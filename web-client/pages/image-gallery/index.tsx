import React from 'react';
import ImageGalleryComponent from '../../components/image-gallery/imageGallery';
import withAuth from '../../components/withAuth';

function ImageGallery() {
  return (
    <div>
      <ImageGalleryComponent />
    </div>
  );
}

export default withAuth(ImageGallery);
