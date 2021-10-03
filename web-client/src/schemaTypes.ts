/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPostById
// ====================================================

export interface getPostById_post_user {
  __typename: 'User';
  userID: string;
  firstName: string;
}

export interface getPostById_post {
  __typename: 'Post';
  postID: string;
  title: string;
  banner: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  isPublished: boolean;
  user: getPostById_post_user;
}

export interface getPostById {
  post: getPostById_post;
}

export interface getPostByIdVariables {
  postID: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPosts
// ====================================================

export interface getPosts_posts_user {
  __typename: 'User';
  userID: string;
  firstName: string;
}

export interface getPosts_posts {
  __typename: 'Post';
  postID: string;
  title: string;
  banner: string;
  content: string;
  isPublished: boolean;
  user: getPosts_posts_user;
}

export interface getPosts {
  posts: getPosts_posts[];
}

export interface getPostsVariables {
  offset: number;
  limit: number;
  isPublished?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost {
  __typename: 'Post';
  title: string;
  banner: string;
  content: string;
  isPublished: boolean;
}

export interface CreatePost {
  createPost: CreatePost_createPost;
}

export interface CreatePostVariables {
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
  __typename: 'Comment';
  commentID: string;
  content: string;
}

export interface CreateComment {
  createComment: CreateComment_createComment;
}

export interface CreateCommentVariables {
  content: string;
  postID: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetComments
// ====================================================

export interface GetComments_comments_user {
  __typename: 'User';
  userID: string;
  firstName: string;
}

export interface GetComments_comments_post {
  __typename: 'Post';
  postID: string;
}

export interface GetComments_comments {
  __typename: 'Comment';
  commentID: string;
  content: string;
  user: GetComments_comments_user;
  post: GetComments_comments_post;
}

export interface GetComments {
  comments: GetComments_comments[];
}

export interface GetCommentsVariables {
  postID: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubscribeToNewPost
// ====================================================

export interface SubscribeToNewPost_newPost_user {
  __typename: 'User';
  userID: string;
  firstName: string;
}

export interface SubscribeToNewPost_newPost {
  __typename: 'Post';
  postID: string;
  title: string;
  banner: string;
  content: string;
  isPublished: boolean;
  user: SubscribeToNewPost_newPost_user;
}

export interface SubscribeToNewPost {
  newPost: SubscribeToNewPost_newPost;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubscribeToNewComment
// ====================================================

export interface SubscribeToNewComment_newComment_user {
  __typename: 'User';
  userID: string;
  firstName: string;
}

export interface SubscribeToNewComment_newComment_post {
  __typename: 'Post';
  postID: string;
}

export interface SubscribeToNewComment_newComment {
  __typename: 'Comment';
  commentID: string;
  content: string;
  user: SubscribeToNewComment_newComment_user;
  post: SubscribeToNewComment_newComment_post;
}

export interface SubscribeToNewComment {
  newComment: SubscribeToNewComment_newComment;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePost
// ====================================================

export interface UpdatePost_updatePost {
  __typename: 'Post';
  postID: string;
  title: string;
  banner: string;
  content: string;
  isPublished: boolean;
}

export interface UpdatePost {
  updatePost: UpdatePost_updatePost;
}

export interface UpdatePostVariables {
  postID: string;
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
// GraphQL mutation operation: DeletePost
// ====================================================

export interface DeletePost {
  deletePost: boolean;
}

export interface DeletePostVariables {
  postID: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser {
  __typename: 'User';
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
  __typename: 'User';
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
  __typename: 'User';
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
  __typename: 'Image';
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
  __typename: 'Image';
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
