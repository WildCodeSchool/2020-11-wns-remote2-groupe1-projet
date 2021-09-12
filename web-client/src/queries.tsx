import { gql } from '@apollo/client';

export const GET_ARTICLE = gql`
  query getArticleById($id: String!) {
    article(id: $id) {
      id
      title
      banner
      content
      createdAt
      updatedAt
      isPublished
      user {
        id
        firstName
      }
    }
  }
`;

export const GET_ARTICLES = gql`
  query getArticles($offset: Float!, $limit: Float!, $isPublished: Boolean) {
    articles(limit: $limit, offset: $offset, isPublished: $isPublished) {
      id
      title
      banner
      content
      isPublished
      user {
        id
        firstName
      }
    }
  }
`;

export const CREATE_ARTICLE = gql`
  # Create Article
  mutation CreateArticle(
    $title: String!
    $banner: String!
    $content: String!
    $isPublished: Boolean!
  ) {
    createArticle(
      data: {
        title: $title
        banner: $banner
        content: $content
        isPublished: $isPublished
      }
    ) {
      title
      banner
      content
      isPublished
    }
  }
`;

export const CREATE_COMMENT = gql`
  # Create comment
  mutation CreateComment($content: String!) {
    createComment(data: { content: $content }) {
      id
      content
    }
  }
`;

export const GET_COMMENTS = gql`
  # Get Comments
  query GetComments {
    comments {
      id
      content
    }
  }
`;

export const SUBSCRIBE_TO_NEW_ARTICLE = gql`
  subscription SubscribeToNewArticle {
    newArticle {
      id
      title
      banner
      content
      isPublished
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  # Update Article
  mutation UpdateArticle(
    $id: String!
    $title: String!
    $banner: String!
    $content: String!
    $isPublished: Boolean!
  ) {
    updateArticle(
      id: $id
      data: {
        title: $title
        banner: $banner
        content: $content
        isPublished: $isPublished
      }
    ) {
      id
      title
      banner
      content
      isPublished
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: String!) {
    deleteArticle(id: $id)
  }
`;

export const REGISTER = gql`
  # Create User
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $password: String!
    $email: String!
  ) {
    createUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        password: $password
        email: $email
      }
    ) {
      firstName
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    createSession(input: { email: $email, password: $password }) {
      id
      email
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      firstName
      lastName
    }
  }
`;

export const GET_RECENT_USERS = gql`
  query GetRecentUsers {
    recentUsers
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
