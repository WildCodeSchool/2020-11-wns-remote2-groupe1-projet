import { gql } from '@apollo/client';

export const GET_POST = gql`
  query getPostById($postID: String!) {
    post(postID: $postID) {
      postID
      title
      image
      content
      createdAt
      updatedAt
      isPublished
      user {
        userID
        username
      }
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts($offset: Float!, $limit: Float!, $isPublished: Boolean) {
    posts(limit: $limit, offset: $offset, isPublished: $isPublished) {
      postID
      title
      image
      content
      isPublished
      user {
        userID
        username
      }
    }
  }
`;

export const CREATE_POST = gql`
  # Create Post
  mutation CreatePost(
    $title: String!
    $image: String!
    $content: String!
    $isPublished: Boolean!
  ) {
    createPost(
      data: {
        title: $title
        image: $image
        content: $content
        isPublished: $isPublished
      }
    ) {
      title
      image
      content
      isPublished
    }
  }
`;

export const UPDATE_POST = gql`
  # Update Post
  mutation UpdatePost(
    $postID: String!
    $title: String!
    $image: String!
    $content: String!
    $isPublished: Boolean!
  ) {
    updatePost(
      postID: $postID
      data: {
        title: $title
        image: $image
        content: $content
        isPublished: $isPublished
      }
    ) {
      postID
      title
      image
      content
      isPublished
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postID: String!) {
    deletePost(postID: $postID)
  }
`;
export const CREATE_COMMENT = gql`
  # Create comment
  mutation CreateComment($content: String!, $postID: String!) {
    createComment(postID: $postID, data: { content: $content }) {
      commentID
      content
    }
  }
`;
export const GET_COMMENTS = gql`
  # Get Comments
  query GetComments($postID: String!) {
    comments(postID: $postID) {
      commentID
      content
      user {
        userID
        username
      }
      post {
        postID
      }
      createdAt
    }
  }
`;

export const REGISTER = gql`
  # Create User
  mutation CreateUser(
    $username: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $email: String!
  ) {
    createUser(
      input: {
        username: $username
        firstName: $firstName
        lastName: $lastName
        password: $password
        email: $email
      }
    ) {
      username
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    createSession(input: { email: $email, password: $password }) {
      userID
      email
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      userID
      username
      firstName
      lastName
      email
      phoneNo
      country
      birthDate
    }
  }
`;

export const GET_RECENT_USERS = gql`
  query GetRecentUsers {
    recentUsers
  }
`;
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $userID: String!
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $birthDate: String
    $country: String
    $phoneNo: String
  ) {
    updateUser(
      userID: $userID
      input: {
        username: $username
        firstName: $firstName
        lastName: $lastName
        email: $email
        birthDate: $birthDate
        country: $country
        phoneNo: $phoneNo
      }
    ) {
      userID
      username
      firstName
      lastName
      email
      phoneNo
      country
      birthDate
    }
  }
`;
export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      id
    }
  }
`;

export const GET_IMAGES = gql`
  query GetImages {
    images {
      id
      extension
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation DeleteImage($id: String!) {
    deleteImage(id: $id)
  }
`;

export const SUBSCRIBE_TO_NEW_POST = gql`
  subscription SubscribeToNewPost {
    newPost {
      postID
      title
      image
      content
      isPublished
      user {
        userID
        username
      }
    }
  }
`;

export const SUBSCRIBE_TO_NEW_COMMENT = gql`
  subscription SubscribeToNewComment {
    newComment {
      commentID
      content
      user {
        userID
        username
      }
      post {
        postID
      }
      createdAt
    }
  }
`;
