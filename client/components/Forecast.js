import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const Forecast = ({ activeTrip }) => {
  const [weather, setWeather] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get(`/weather/${activeTrip.id}`).then(({ data }) => {
      if (data[0] && Object.keys(data[0].forecast).length) {
        setWeather(data[0].forecast);
        const createData = (day1, day2, day3) => {
          return { day1, day2, day3 };
        };
        const result = [[], [], []];
        Object.values(data[0].forecast).slice(0, 3).forEach((day) => {
          result[0].push(<img src={day.icon} alt={day.weather} />);
          result[1].push(`High: ${day.temp.high}`);
          result[2].push(`Low: ${day.temp.low}`);
        });
        setRows(result.map((row) => createData(...row)));
      } else {
        setWeather('unavailable');
      }
    });
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {/* <TableCell> </TableCell> */}
            <TableCell align="center">Today</TableCell>
            <TableCell align="center">Tomorrow</TableCell>
            <TableCell align="center">Day After</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              {/* <TableCell component="th" scope="row">
                {row.info}
              </TableCell> */}
              <TableCell align="center">{row.day1}</TableCell>
              <TableCell align="center">{row.day2}</TableCell>
              <TableCell align="center">{row.day3}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Forecast;
