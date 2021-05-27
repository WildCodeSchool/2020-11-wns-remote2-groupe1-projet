import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import NavBar from './NavBar';
import classes from './style.module.scss';
import { UserProvider } from './UserContext';

const AppProviders = ({ children, pageProps }) => {
  const client = new ApolloClient({
    link: createUploadLink({
      uri: '/graphql',
    }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NavBar children={children} />
      <UserProvider>
        <main className={classes.container}>{children}</main>
      </UserProvider>
    </ApolloProvider>
  );
};

export default AppProviders;
