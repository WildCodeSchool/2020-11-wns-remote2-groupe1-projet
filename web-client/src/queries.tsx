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
    $school: String!
    $email: String!
  ) {
    createUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        password: $password
        email: $email
        school: $school
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

export const GET_ME = gql`
  query GetMe {
    me {
      id
      firstName
      lastName
      school
    }
  }
`;

export const UPLOAD_PICTURE = gql`
  mutation UploadPicture($file: Upload!) {
    uploadPicture(file: $file) {
      id
    }
  }
`;

export const GET_PICTURES = gql`
  query GetPictures {
    pictures {
      id
      extension
    }
  }
`;
