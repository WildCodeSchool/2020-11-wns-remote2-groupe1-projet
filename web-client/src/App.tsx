import React from 'react';
import { Button } from '@material-ui/core';

import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { ArticleList } from './components/articles/article-list';

const App = (): JSX.Element => {
  return (
    <div>
      <Header />
      <h1>Hello, this is APP speaking</h1>
      <Button variant="contained" color="primary">
        Hello world
      </Button>
      <ArticleList />
      <Footer />
    </div>
  );
};

export default App;
