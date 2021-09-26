/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getArticleById
// ====================================================

export interface getArticleById_article_user {
  __typename: "User";
  userID: string;
  firstName: string;
}

export interface getArticleById_article {
  __typename: "Article";
  articleID: string;
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
  articleID: string;
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
  userID: string;
  firstName: string;
}

export interface getArticles_articles {
  __typename: "Article";
  articleID: string;
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
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment_createComment {
  __typename: "Comment";
  commentID: string;
  content: string;
}

export interface CreateComment {
  createComment: CreateComment_createComment;
}

export interface CreateCommentVariables {
  content: string;
  articleID: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetComments
// ====================================================

export interface GetComments_comments_user {
  __typename: "User";
  userID: string;
  firstName: string;
}

export interface GetComments_comments_article {
  __typename: "Article";
  articleID: string;
}

export interface GetComments_comments {
  __typename: "Comment";
  commentID: string;
  content: string;
  user: GetComments_comments_user;
  article: GetComments_comments_article;
}

export interface GetComments {
  comments: GetComments_comments[];
}

export interface GetCommentsVariables {
  articleID: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubscribeToNewArticle
// ====================================================

export interface SubscribeToNewArticle_newArticle_user {
  __typename: "User";
  userID: string;
  firstName: string;
}

export interface SubscribeToNewArticle_newArticle {
  __typename: "Article";
  articleID: string;
  title: string;
  banner: string;
  content: string;
  isPublished: boolean;
  user: SubscribeToNewArticle_newArticle_user;
}

export interface SubscribeToNewArticle {
  newArticle: SubscribeToNewArticle_newArticle;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubscribeToNewComment
// ====================================================

export interface SubscribeToNewComment_newComment_user {
  __typename: "User";
  userID: string;
  firstName: string;
}

export interface SubscribeToNewComment_newComment_article {
  __typename: "Article";
  articleID: string;
}

export interface SubscribeToNewComment_newComment {
  __typename: "Comment";
  commentID: string;
  content: string;
  user: SubscribeToNewComment_newComment_user;
  article: SubscribeToNewComment_newComment_article;
}

export interface SubscribeToNewComment {
  newComment: SubscribeToNewComment_newComment;
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
  articleID: string;
  title: string;
  banner: string;
  content: string;
  isPublished: boolean;
}

export interface UpdateArticle {
  updateArticle: UpdateArticle_updateArticle;
}

export interface UpdateArticleVariables {
  articleID: string;
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
  articleID: string;
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
  userID: string;
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
// GraphQL query operation: GetCurrentUser
// ====================================================

export interface GetCurrentUser_currentUser {
  __typename: "User";
  userID: string;
  firstName: string;
  lastName: string;
}

export interface GetCurrentUser {
  currentUser: GetCurrentUser_currentUser;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRecentUsers
// ====================================================

export interface GetRecentUsers {
  recentUsers: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadImage
// ====================================================

export interface UploadImage_uploadImage {
  __typename: "Image";
  id: string;
}

export interface UploadImage {
  uploadImage: UploadImage_uploadImage;
}

export interface UploadImageVariables {
  file: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetImages
// ====================================================

export interface GetImages_images {
  __typename: "Image";
  id: string;
  extension: string;
}

export interface GetImages {
  images: GetImages_images[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteImage
// ====================================================

export interface DeleteImage {
  deleteImage: boolean;
}

export interface DeleteImageVariables {
  id: string;
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
