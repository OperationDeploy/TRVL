import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EventIcon from '@material-ui/icons/Event';
import FlightIcon from '@material-ui/icons/Flight';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { indigo, orange } from '@material-ui/core/colors';
import PlanATrip from './PlanATrip';
import Trips from './Trips';
import UserTrips from './UserTrips';
import Preferences from './preferences';
import App from './app';
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
    color: 'primary',
  },
}));

const ResponsiveDrawer = ({
  clickPlan,
  onClickPlanTrip,
  clickTrips,
  onClickGetTrips,
  currentUser,
  currentTrip,
}) => {
  const classes = useStyles();
  // const theme = useTheme();
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {['HOME'].map((text) => (
          <ListItem button onClick={() => {
            return <App />;
          }} key={text}>
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
          <ListItem button onClick={() => {
            onClickPlanTrip();
            if (clickPlan) {
              return <Preferences currentUser={currentUser} />;
            }
            return null;
          }} key={text}>
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
          <ListItem button onClick={() => {
            onClickGetTrips();
            if (clickTrips) {
              return <UserTrips currentUser={currentUser} currentTrip={currentTrip} />;
            }
            return null;
          }} key={text}>
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
          <ListItem button onClick={() => console.info(`${text} Clicked!`)} key={text}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
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

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" styles={{ background: 'secondary', boxShadow: 'none' }} className={classes.appBar}>
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
            </Typography>
            <br />
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
        <main className={classes.content} >
          <div className={classes.toolbar} />
          <div style={{ textAlign: 'center', justifyContent: 'center' }}>
            <img
              src={currentUser.profile_pic}
              alt="user loaded from google login"
              className="profile-pic"
            />
          </div>
          <Typography className="welcome-message" variant="h6">{`Hi, ${currentUser.first_name}!`}</Typography>
          <br />
          <Trips
            clickTrips={clickTrips}
            onClickGetTrips={onClickGetTrips}
            currentUser={currentUser}
            currentTrip={currentTrip}
          />
          <br />
          <PlanATrip
            clickPlan={clickPlan}
            onClickPlanTrip={onClickPlanTrip}
            currentUser={currentUser}
          />
        </main>
      </div>
    </ThemeProvider>
  );
};

ResponsiveDrawer.propTypes = {
  onClickGetTrips: PropTypes.func.isRequired,
  clickTrips: PropTypes.bool.isRequired,
  clickPlan: PropTypes.bool.isRequired,
  onClickPlanTrip: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  currentTrip: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

export default ResponsiveDrawer;
