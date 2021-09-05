module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:jest/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier', 'jest'],
  settings: {
    react: {
      version: 'latest',
    },
  },
};
