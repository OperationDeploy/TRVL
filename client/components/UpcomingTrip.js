import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import FlightIcon from '@material-ui/icons/Flight';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import LocalGasStationOutlinedIcon from '@material-ui/icons/LocalGasStationOutlined';
import moment from 'moment';
import TripCalendar from './TripCalendar';
import Purchases from './Purchases';
import Photos from './Photos';
import Flights from './Flights';
import GasPrices from './GasPrices';
import Hotels from './Hotels';

const UpcomingTrip = ({ trip, currentUser, setClickedPage }) => {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const classes = useStyles();
  return (
    <div>
      {/* The Upcoming Trip Div */}
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Your upcoming trip to
          </Typography>
          <Typography variant="h5" component="h2">
            {trip.destination}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            is {moment(trip.start_date, 'YYYY-MM-DD').fromNow()}
          </Typography>
        </CardContent>
      </Card>
      <List>
        <ListItem>
          <div className={classes.root}>
            <ButtonGroup
              variant="text"
              color="secondary"
              aria-label="text primary button group"
            >
              <Button
                onClick={() => {
                  setClickedPage(
                    <Flights currentUser={currentUser} currentTrip={trip} />,
                  );
                }}
              >
                <FlightIcon />
              </Button>
              <Button
                onClick={() => {
                  setClickedPage(<Hotels currentUser={currentUser} currentTrip={trip} />);
                }}
                color="secondary"
              >
                <HotelOutlinedIcon />
              </Button>
              <Button
                onClick={() => {
                  setClickedPage(
                    <TripCalendar currentUser={currentUser} currentTrip={trip} />,
                  );
                }}
                color="secondary"
              >
                <DateRangeOutlinedIcon />
              </Button>
              <Button
                onClick={() => {
                  setClickedPage(
                    <Purchases currentUser={currentUser} currentTrip={trip} />,
                  );
                }}
                color="secondary"
              >
                <AttachMoneyIcon />
              </Button>
              <Button
                onClick={() => {
                  setClickedPage(<Photos currentUser={currentUser} currentTrip={trip} />);
                }}
                color="secondary"
              >
                <PhotoCameraOutlinedIcon />
              </Button>
              <Button
                onClick={() => {
                  setClickedPage(<GasPrices currentTrip={trip} />);
                }}
                color="secondary"
              >
                <LocalGasStationOutlinedIcon />
              </Button>
            </ButtonGroup>
          </div>
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};

UpcomingTrip.propTypes = {
  trip: PropTypes.shape({
    name: PropTypes.string,
    destination: PropTypes.string,
    start_date: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.shape({}).isRequired,
  setClickedPage: PropTypes.func.isRequired,
};

export default UpcomingTrip;
