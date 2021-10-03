import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import ImageGalleryComponent from '../../components/image-gallery/imageGallery';
import LoginComponent from '../../components/login/Login';
import { UserContext } from '../../contexts/Contexts';

function ImageGallery() {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();

  // useEffect(() => {
  // if (!currentUser) {
  //  router.push(`/login`);
  //}
  //}, []);

  return (
    <div>
      <ImageGalleryComponent />
    </div>
  );
}

export default ImageGallery;
