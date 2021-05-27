export interface GetArticles_articles {
  __typename: 'Article';
  id: string;
  title: string;
}

export interface GetArticles {
  articles: GetArticles_articles[];
}

export interface GetImages_images {
  __typename: "Image";
  id: string;
  extension: string;
}

export interface GetImages {
  images: GetImages_images[];
}
export interface UploadImage_uploadImage {
  __typename: "Image";
  id: string;
  extension: string;
}

export interface UploadImage {
  uploadImage: UploadImage_uploadImage;
}

export interface UploadImageVariables {
  file: any;
}
