import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FlightIcon from '@material-ui/icons/Flight';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import LocalGasStationOutlinedIcon from '@material-ui/icons/LocalGasStationOutlined';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import axios from 'axios';
import TripCalendar from './TripCalendar';
import Purchases from './Purchases';
import Photos from './Photos';
import Flights from './Flights';
import GasPrices from './GasPrices';
import Hotels from './Hotels';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(3),
    },
  },
}));

const UserTrips = ({ currentUser }) => {
  const [clicked, setClicked] = useState(null);
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState({});
  const classes = useStyles();

  const handleChange = (response) => {
    setTrips(response);
  };

  useEffect(() => {
    axios
      .post('./getAllTrips', { user_id: currentUser.googleId }, () => {})
      .then((response) => {
        handleChange(response.data);
      });
  }, []);

  switch (clicked) {
    case 'itinerary':
      return <TripCalendar currentUser={currentUser} currentTrip={currentTrip} />;
    case 'purchases':
      return <Purchases currentUser={currentUser} currentTrip={currentTrip} />;
    case 'photos':
      return <Photos currentUser={currentUser} currentTrip={currentTrip} />;
    case 'flights':
      return <Flights currentUser={currentUser} currentTrip={currentTrip} />;
    case 'gas':
      return <GasPrices currentTrip={currentTrip} />;
    case 'hotels':
      return <Hotels currentUser={currentUser} currentTrip={currentTrip} />;
    default:
  }

  return (
    <div className="trips-container">
      <Typography component="h1" variant="h4">
        Trips
      </Typography>
      {trips.map((data, index) => (
        <List key={index.toString()}>
          <ListItem>
            <ListItemText>
              <Typography>{`${data.name}`}</Typography>
            </ListItemText>
            <div className={classes.root}>
              <ButtonGroup
                variant="text"
                color="secondary"
                aria-label="text primary button group"
              >
                <Tooltip placement="top" title="Flights">
                  <Button
                    onClick={() => {
                      const trip = { id: data.id, city: data.destination };
                      setCurrentTrip(trip);
                      setClicked('flights');
                    }}
                    color="secondary"
                  >
                    <FlightIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Hotels">
                  <Button
                    onClick={() => {
                      const trip = { id: data.id, city: data.destination };
                      setCurrentTrip(trip);
                      setClicked('hotels');
                    }}
                    color="secondary"
                  >
                    <HotelOutlinedIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Itinerary">
                  <Button
                    onClick={() => {
                      const trip = {
                        ...data,
                        city: data.destination,
                        startDate: data.start_date,
                        endDate: data.end_date,
                      };
                      setCurrentTrip(trip);
                      setClicked('itinerary');
                    }}
                    color="secondary"
                  >
                    <DateRangeOutlinedIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Purchases">
                  <Button
                    onClick={() => {
                      const trip = { id: data.id, city: data.destination };
                      setCurrentTrip(trip);
                      setClicked('purchases');
                    }}
                    color="secondary"
                  >
                    <AttachMoneyIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Photos">
                  <Button
                    onClick={() => {
                      const trip = { id: data.id, city: data.destination };
                      setCurrentTrip(trip);
                      setClicked('photos');
                    }}
                    color="secondary"
                  >
                    <PhotoCameraOutlinedIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Gas">
                  <Button
                    onClick={() => {
                      setCurrentTrip(data);
                      setClicked('gas');
                    }}
                    color="secondary"
                  >
                    <LocalGasStationOutlinedIcon />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </div>
          </ListItem>
          <Divider />
        </List>
      ))}
    </div>
  );
};

UserTrips.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

export default UserTrips;
