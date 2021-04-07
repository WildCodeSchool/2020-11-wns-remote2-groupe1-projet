import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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
          <Button aria-label="menu" color="inherit">
            <Link to="/login">Connexion</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
