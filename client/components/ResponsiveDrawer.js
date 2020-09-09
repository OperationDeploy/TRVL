import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import PlanATrip from './PlanATrip';
import Trips from './Trips';
import Chat from './Chat';

import InvitesPage from './InvitesPage';

import './App.scss';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  large: {},
}));

const ResponsiveDrawer = ({ currentUser, currentTrip, otherUsers }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showInvites, setShowInvite] = useState(false);
  const [myInvites, setMyInvites] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [clickedPage, setClickedPage] = useState(null);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {['HOME'].map((text) => (
          <ListItem
            button
            onClick={() => {
              setClickedPage(null);
              setMobileOpen(!mobileOpen);
            }}
            key={text}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Trip Invites'].map((text) => (
          <ListItem button onClick={() => setShowInvite(!showInvites)} key={text}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem button onClick={() => console.info(`${text} Clicked!`)} key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <PersonIcon /> : <PersonOutlineIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Chat'].map((text, index) => (
          <ListItem button onClick={() => setShowChat(!showChat)} key={text}>
            <ListItemIcon>{index % 2 === 0 ? <ChatIcon /> : <ChatIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  useEffect(() => {
    axios
      .get('/getInvites', { params: { googleId: currentUser.googleId } })
      .then((response) => setMyInvites(response.data))
      .catch((err) => console.warn('ERRR', err));
  }, [showInvites]);

  if (showInvites === true) {
    // set state for invited trips
    // pass state to preferences
    // refactor prefs to use state from invited trip

    return (
      <div>
        <InvitesPage
          currentUser={currentUser}
          otherUsers={otherUsers}
          myInvites={myInvites}
        />
        <Trips
          currentUser={currentUser}
          currentTrip={currentTrip}
          setClickedPage={setClickedPage}
        />
      </div>
    );
  }

  if (showChat === true) {
    return (
      <div>
        <Chat currentUser={currentUser} />
      </div>
    );
  }

  const container = window !== undefined ? () => window.document.body : undefined;

  const landingPage = (
    <div>
      <Avatar alt="profilepic" src={currentUser.profile_pic} className={classes.large} />
      <Typography>{`Hi, ${currentUser.first_name}!`}</Typography>
      <Trips
        currentUser={currentUser}
        currentTrip={currentTrip}
        setClickedPage={setClickedPage}
      />
      <PlanATrip
        otherUsers={otherUsers}
        currentUser={currentUser}
        setClickedPage={setClickedPage}
      />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            TRVL
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {clickedPage || landingPage}
      </main>
    </div>
  );
};

ResponsiveDrawer.propTypes = {
  otherUsers: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      profile_pic: PropTypes.string,
      host: PropTypes.bool,
      googleId: PropTypes.string,
    }),
  ).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  currentTrip: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    destination: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }).isRequired,
};

export default ResponsiveDrawer;
