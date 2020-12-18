import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Switch, Route } from 'react-router-dom';
import ArticleList from './components/articles/ArticleList';
import Home from './components/Home';
// import 'fontsource-roboto';

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/articles">
          <ArticleList />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default App;
