import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
// TODO: Finish active trips section;
import moment from 'moment';

const Forecast = ({ forecast }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const createData = (day1, day2, day3, day4, day5) => ({ day1, day2, day3, day4, day5 });
    const result = [[], [], []];
    Object.values(forecast).forEach((day) => {
      result[0].push(<img src={day.icon} alt={day.weather} />);
      result[1].push(`High: ${day.temp.high}\u00b0`);
      result[2].push(`Low: ${day.temp.low}\u00b0`);
    });
    setRows(result.map((row) => createData(...row)));
    setColumns(Object.keys(forecast));
  }, []);

  const useStyles = makeStyles({
    table: {
      maxWidth: 550,
    },
  });

  const classes = useStyles();

  const toDateStr = (date) => moment(date).format('dddd').slice(0, 3);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className="weather-widget">
            {columns.map((day) => <TableCell align="center" id="main">{toDateStr(day)}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center">{row.day1}</TableCell>
              <TableCell align="center">{row.day2}</TableCell>
              <TableCell align="center">{row.day3}</TableCell>
              <TableCell align="center">{row.day4}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

Forecast.propTypes = {
  forecast: PropTypes.shape({
  }).isRequired,
};

export default Forecast;
