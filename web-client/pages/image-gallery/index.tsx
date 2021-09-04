import React, { useContext } from 'react';
import ImageGalleryComponent from '../../components/image-gallery/imageGallery';
import LoginComponent from '../../components/login/Login';
import { UserContext } from '../../contexts/Contexts';

function ImageGallery() {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <LoginComponent />;
  } else {
    return (
      <div>
        <ImageGalleryComponent />
      </div>
    );
  }
}

export default ImageGallery;
