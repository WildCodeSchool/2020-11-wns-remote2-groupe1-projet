import React from 'react';
import { Button } from '@material-ui/core';

import Header from './components/layout/header';
import Footer from './components/layout/footer';
import ArticleList from './components/articles/ArticleList';

const App = (): JSX.Element => {
  return (
    <div>
      <Header />
      <Button variant="contained" color="primary">
        Test Button
      </Button>
      <ArticleList />
      <Footer />
    </div>
  );
};

export default App;
