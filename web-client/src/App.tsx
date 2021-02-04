import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Switch, Route } from 'react-router-dom';
import ArticleList from './components/articles/ArticleList';
import Home from './components/Home';
import Login from './components/login';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Switch>
        <Route path="/articles">
          <ArticleList />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      <Footer />
    </ApolloProvider>
  );
};

export default App;
