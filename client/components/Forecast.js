import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
// import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Accordion, AccordionDetails, AccordionSummary, AccordionActions } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const Forecast = ({ activeTrip }) => {
  const [weather, setWeather] = useState([]);
  // const [data, setData] = useState([]);

  useEffect(() => {
    // axios.get(`/weather/${activeTrip.id}`).then(({ data }) => {
    //   if (data[0] && Object.keys(data[0].forecast).length) {
    //     setWeather(data[0].forecast);

    // const result = [[],[],[]];
    // Object.values(data[0].forecast).forEach((day) => {
    //   result[0].push(day.weather);
    //   result[1].push(day.temp.high);
    //   result[2].push(day.temp.low);
    // })
    // setData(result);

    // } else {
    //   setWeather('unavailable');
    // }
    // });
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      borderRight: `2px solid ${theme.palette.divider}`,
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1c-content"
        id="panel1c-header"
      >
        <div className={classes.column}>
          <Typography className={classes.heading}>Location</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>Select trip destination</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        {/* <div className={classes.column} /> */}
        <div className={classes.column}>
          Test Test
        </div>
        {/* <div className={classes.column} /> */}
        {/* <div className={clsx(classes.column, classes.helper)}>
          <Typography variant="caption">
            Select your destination of choice
            <br />
            <a href="#secondary-heading-and-columns" className={classes.link}>
              Learn more
            </a>
          </Typography>
        </div>
        <div className={clsx(classes.column, classes.helper)}>
          <Typography variant="caption">
            Select your destination of choice
            <br />
            <a href="#secondary-heading-and-columns" className={classes.link}>
              Learn more
            </a>
          </Typography>
        </div> */}
      </AccordionDetails>
      {/* <Divider /> */}
    </Accordion>
    </div>
    // <div>
    //   <MUIDataTable
    //     title={"Forecast"}
    //     data={data}
    //     columns={Object.keys(weather)}
    //     options={{}}
    //     displaySelectAll={false}
    //     adjustForCheckbox={false}
    //   />
    // </div>
  );
};

export default Forecast;
