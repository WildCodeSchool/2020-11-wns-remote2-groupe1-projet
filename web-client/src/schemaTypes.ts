/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getArticleById
// ====================================================

export interface getArticleById_article_user {
  __typename: "User";
  id: string;
  firstName: string;
}

export interface getArticleById_article {
  __typename: "Article";
  id: string;
  title: string;
  banner: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  isPublished: boolean;
  user: getArticleById_article_user;
}

export interface getArticleById {
  article: getArticleById_article;
}

export interface getArticleByIdVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getArticles
// ====================================================

export interface getArticles_articles_user {
  __typename: "User";
  id: string;
  firstName: string;
}

export interface getArticles_articles {
  __typename: "Article";
  id: string;
  title: string;
  banner: string;
  content: string;
  isPublished: boolean;
  user: getArticles_articles_user;
}

export interface getArticles {
  articles: getArticles_articles[];
}

export interface getArticlesVariables {
  offset: number;
  limit: number;
  isPublished?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateArticle
// ====================================================

export interface CreateArticle_createArticle {
  __typename: "Article";
  title: string;
  banner: string;
  content: string;
  isPublished: boolean;
}

export interface CreateArticle {
  createArticle: CreateArticle_createArticle;
}

export interface CreateArticleVariables {
  title: string;
  banner: string;
  content: string;
  isPublished: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateArticle
// ====================================================

export interface UpdateArticle_updateArticle {
  __typename: "Article";
  id: string;
  title: string;
  banner: string;
  content: string;
  isPublished: boolean;
}

export interface UpdateArticle {
  updateArticle: UpdateArticle_updateArticle;
}

export interface UpdateArticleVariables {
  id: string;
  title: string;
  banner: string;
  content: string;
  isPublished: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteArticle
// ====================================================

export interface DeleteArticle {
  deleteArticle: boolean;
}

export interface DeleteArticleVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser {
  __typename: "User";
  firstName: string;
}

export interface CreateUser {
  createUser: CreateUser_createUser;
}

export interface CreateUserVariables {
  firstName: string;
  lastName: string;
  password: string;
  school: string;
  email: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_createSession {
  __typename: "User";
  id: string;
  email: string;
}

export interface Login {
  createSession: Login_createSession;
}

export interface LoginVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMe
// ====================================================

export interface GetMe_me {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  school: string;
}

export interface GetMe {
  me: GetMe_me;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadPicture
// ====================================================

export interface UploadPicture_uploadPicture {
  __typename: "Picture";
  id: string;
}

export interface UploadPicture {
  uploadPicture: UploadPicture_uploadPicture;
}

export interface UploadPictureVariables {
  file: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPictures
// ====================================================

export interface GetPictures_pictures {
  __typename: "Picture";
  id: string;
  extension: string;
}

export interface GetPictures {
  pictures: GetPictures_pictures[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
