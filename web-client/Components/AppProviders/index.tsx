import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client";
import NavBar from "./NavBar";
import classes from "./style.module.scss";

const AppProviders = ({ children, pageProps }) => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NavBar />
      <main className={classes.container}>{children}</main>
    </ApolloProvider>
  );
};

export default AppProviders;
