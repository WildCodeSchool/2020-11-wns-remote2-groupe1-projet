import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  fade,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Link as MaterialLink } from '@material-ui/core';
import { SPACER_L } from '../../../src/theme';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    navBarLeft: {
      display: 'flex',
    },
    link: {
      color: 'white',
    },
    logo: {
      fontSize: '16pt',
      color: 'white',
      paddingRight: SPACER_L,
    },
    navBarRight: {
      display: 'flex',
    },
  })
);

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const NavBar = (props: Props) => {
  const classes = useStyles();
  return (
    <div>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar className={classes.root}>
            <div className={classes.navBarLeft}>
              <Link href="/">
                <Button className={classes.logo}>Chatter App</Button>
              </Link>
              <Link href="/create-article">
                <Button className={classes.link}>New Article</Button>
              </Link>
              <Link href="/edit-articles">
                <Button className={classes.link}>Edit Article</Button>
              </Link>
            </div>
            <div className={classes.navBarRight}>
              <Link href="/login">
                <Button color="inherit">Login</Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
};

export default NavBar;
