import React from 'react';
import ArticleList from '../articles/ArticleList';
import Home from '../Home';
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Typography variant="h6">
              <Link to="/">Home</Link>
            </Typography>
          </IconButton>
          <Button variant="contained" color="primary">
            <Link to="/class">Ma classe</Link>
          </Button>
          <Button variant="contained" color="primary">
            <Link to="/articles">Articles</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
