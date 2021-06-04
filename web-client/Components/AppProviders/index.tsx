import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import NavBar from './NavBar';
import classes from './style.module.scss';
import { UserContextProvider } from './UserContext';

const AppProviders = ({ children }) => {
  const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NavBar children={children} />
      <UserContextProvider>
        <main className={classes.container}>{children}</main>
      </UserContextProvider>
    </ApolloProvider>
  );
};

export default AppProviders;
