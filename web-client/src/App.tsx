import React from 'react';
import { Button } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Header from './components/layout/header';
import Footer from './components/layout/footer';
import ArticleList from './components/articles/ArticleList';

const App = (): JSX.Element => {
  return (
    <Router>
      <div>
        <Header />
        <ul>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/articles">
            <ArticleList />
          </Route>
        </Switch>
        <Button variant="contained" color="primary">
          Test Button
        </Button>

        <ArticleList />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
