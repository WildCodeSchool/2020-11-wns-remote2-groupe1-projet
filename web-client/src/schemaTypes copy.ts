export interface GetArticles_articles {
  __typename: 'Article';
  id: string;
  title: string;
}

export interface GetArticles {
  articles: GetArticles_articles[];
}

export interface GetUser {
  firstName: string;
  lastName: string;
  school: string;
}

export interface GetPictures_pictures {
  __typename: 'Picture';
  id: string;
  extension: string;
}

export interface GetPictures {
  pictures: GetPictures_pictures[];
}

export interface UploadPicture_uploadPicture {
  __typename: 'Picture';
  id: string;
  extension: string;
}

export interface UploadPicture {
  uploadPicture: UploadPicture_uploadPicture;
}

export interface UploadPictureVariables {
  file: any;
}
