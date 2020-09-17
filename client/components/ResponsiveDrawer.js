import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import IconButton from '@material-ui/core/IconButton';
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
import { Typography, CircularProgress } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import FlightIcon from '@material-ui/icons/Flight';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { indigo, orange } from '@material-ui/core/colors';
import axios from 'axios';
import Preferences from './preferences';
import Trips from './Trips';
import PlanATrip from './PlanATrip';
import Chat from './Chat';
import UserTrips from './UserTrips';
import InvitesPage from './InvitesPage';
import Forecast from './Forecast';
import ActiveTrip from './ActiveTrip';
import UpcomingTrip from './UpcomingTrip';
import './ResponsiveDrawer.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    textAlign: 'center',
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
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    color: 'primary',
  },
}));

const ResponsiveDrawer = ({ currentUser, currentTrip, window }) => {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: indigo[500],
      },
      secondary: {
        main: orange[500],
      },
    },
    typography: {
      fontFamily: 'sans-serif',
      fontSize: 20,
      fontWeightBold: 500,
    },
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [myInvites, setMyInvites] = useState([]);
  const [clickedPage, setClickedPage] = useState(null);
  const [toggleIcon, setToggleIcon] = useState(false);
  const [newMsg, setNewMsg] = useState(false);
  const [toggleNewMsgIcon, setToggleNewMsgIcon] = useState(false);
  const [activeTrip, setActiveTrip] = useState(null);
  const [upcomingTrip, setUpcomingTrip] = useState(null);
  const [loadComplete, setLoadComplete] = useState(false);
  const [check, setCheck] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleToggleChatRead = () => {
    axios
      .post('/setUnread', { currentUser })
      .then((response) => {
        if (response) {
          setToggleNewMsgIcon(false);
          setNewMsg(false);
        }
      })
      .catch((err) => console.warn(err));
  };

  const newMsgs = () => {
    setCheck(true);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {['Home'].map((text) => (
          <ListItem
            button
            onClick={() => {
              setClickedPage(null);
              setMobileOpen(false);
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
        {['Plan A Trip'].map((text) => (
          <ListItem
            button
            onClick={() => {
              setClickedPage(<Preferences
                currentUser={currentUser}
                currentTrip={currentTrip}
                setClickedPage={setClickedPage}
              />);
              setMobileOpen(false);
            }}
            key={text}
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Trips'].map((text) => (
          <ListItem
            button
            onClick={() => {
              setClickedPage(<UserTrips currentUser={currentUser} currentTrip={currentTrip} />);
              setMobileOpen(false);
            }}
            key={text}
          >
            <ListItemIcon>
              <FlightIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Trip Invites'].map((text) => (
          <ListItem
            button
            onClick={() => {
              setClickedPage(<InvitesPage
                currentUser={currentUser}
                currentTrip={currentTrip}
                myInvites={myInvites}
                setClickedPage={setClickedPage}
              />);
              if (myInvites.length !== 0) {
                setToggleIcon(true);
              }
              setMobileOpen(false);
            }}
            key={text}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
            {myInvites.length !== 0 && toggleIcon === false ? (
              <FiberNewIcon color="primary" />
            ) : null}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Chat'].map((text, index) => (
          <ListItem
            button
            onClick={() => {
              setClickedPage(<Chat currentUser={currentUser} newMsgs={() => newMsgs()} />);
              setMobileOpen(false);
              handleToggleChatRead();
            }}
            key={text}
          >
            <ListItemIcon>{index % 2 === 0 ? <ChatIcon /> : <ChatIcon />}</ListItemIcon>
            <ListItemText primary={text} />
            {newMsg && toggleNewMsgIcon ? <FiberNewIcon color="primary" /> : null}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map((text) => (
          <ListItem button onClick={() => console.info(`${text} Clicked!`)} key={text}>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (check) {
    axios
      .post('./newMsgs', {
        trip: currentTrip,
        currentUser,
      })
      .then((response) => {
        if (response.data.length > 0) {
          setToggleNewMsgIcon(true);
          setNewMsg(true);
          setCheck(false);
        }
      }, [])
      .catch((err) => console.warn(err));
  }

  useEffect(() => {
    axios
      .get('/getInvites', { params: { googleId: currentUser.googleId } })
      .then((response) => setMyInvites(response.data))
      .catch((err) => console.warn('ERRR', err));
  }, []);

  useEffect(() => {
    axios.get('/activeTrip')
      .then(({ data }) => {
        if (data.activeTrip) {
          setActiveTrip(data);
        } else {
          setUpcomingTrip(data);
        }
        setLoadComplete(true);
      });
  }, []);

  const container = window !== undefined ? () => window.document.body : undefined;

  let activeTripView = activeTrip ? (
    <div>
    <ActiveTrip trip={activeTrip} setClickedPage={setClickedPage}
      currentUser={currentUser} />
    <Forecast forecast={activeTrip.forecast}/>
    </div>
  ) : null;

  if (!loadComplete) {
    activeTripView = <CircularProgress />;
  }

  const upcomingTripView = upcomingTrip ? (
    <div>
    <UpcomingTrip trip={upcomingTrip} setClickedPage={setClickedPage}
      currentUser={currentUser} />
    <Forecast forecast={upcomingTrip.forecast}/>
    </div>
  ) : null;

  const landingPage = (
    <div className="landing-page">
      <img
        src={currentUser.profile_pic}
        alt="user loaded from google login"
        className="profile-pic"
      />
      <Typography className="welcome-message" variant="h6">
        {`Hi, ${currentUser.first_name}!`}
      </Typography>
      <div className="trips">
      <Trips
        currentUser={currentUser}
        currentTrip={currentTrip}
        setClickedPage={setClickedPage}
      />
      </div>
      <PlanATrip
        currentUser={currentUser}
        setClickedPage={setClickedPage}
      />
      <div className="active-trip">{activeTripView || upcomingTripView}</div>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="secondary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              TRVL
              <img
                src={currentUser.profile_pic}
                alt="user loaded from google login for toolbar"
                className="toolbar-pic"
              />
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
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
                keepMounted: true,
              }}
            >
              {drawer}
              {}
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
          <div style={{ textAlign: 'center', justifyContent: 'center' }}>
            {clickedPage || landingPage}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

ResponsiveDrawer.propTypes = {
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
  window: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(Element),
    }),
  ]).isRequired,
};

export default ResponsiveDrawer;
