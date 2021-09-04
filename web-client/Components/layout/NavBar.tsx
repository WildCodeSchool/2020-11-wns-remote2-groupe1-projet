import React, { useContext } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { DEFAULT_UI_COLOR } from '../../styles/theme';
import { UserContext } from '../Contexts';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: DEFAULT_UI_COLOR,
    },
    navBarContent: {
      display: 'flex',
    },
    respNavBarContent: {
      display: 'none',
      justifyContent: 'space-between',
      paddingRight: '2rem',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },

    link: {
      color: 'inherit',
    },
    logo: {
      fontSize: '16pt',
      color: 'inherit',
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
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { currentUser } = useContext(UserContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={classes.toolbar}>
      <Link href="/">
        <Button className={classes.logo}>Chatter App</Button>
      </Link>
      <Divider />
      <List>
        <ListItem>
          <Link href="/create-article">
            <Button className={classes.link}>New Article</Button>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/edit-articles">
            <Button className={classes.link}>Edit Article</Button>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/image-gallery">
            <Button className={classes.link}>Image Gallery</Button>
          </Link>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar className={classes.root}>
            <div className={classes.navBarContent}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Link href="/">
                <Button className={classes.logo}>Chatter App</Button>
              </Link>
            </div>

            <div className={classes.navBarContent}>
              <div className={classes.respNavBarContent}>
                <Link href="/create-article">
                  <Button className={classes.link}>New Article</Button>
                </Link>
                <Link href="/edit-articles">
                  <Button className={classes.link}>Edit Article</Button>
                </Link>
                <Link href="/image-gallery">
                  <Button className={classes.link}>Image Gallery</Button>
                </Link>
              </div>
              <Link href={currentUser ? '/account' : '/login'}>
                <Button color="inherit">
                  {currentUser ? 'Account' : 'Login'}
                </Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default NavBar;
