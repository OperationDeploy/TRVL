const xlsxFile = require('read-excel-file/node');
const {
  Destinations, Trip, TripUser, User,
} = require('./server/db');

<<<<<<< HEAD
xlsxFile('./users.xlsx')
  .then(async (rows) => {
    const columnNames = rows.shift();
    const promises = rows.map((row) => {
      const obj = {};
      row.forEach((cell, i) => {
        obj[columnNames[i]] = cell;
      });
      return User.create(obj);
    });
    await Promise.all(promises);
    xlsxFile('./trips.xlsx')
      .then(async (rows) => {
        const columnNames = rows.shift();
        const promises = rows.map((row) => {
          const obj = {};
          row.forEach((cell, i) => {
            obj[columnNames[i]] = cell;
          });
          return Trip.create(obj);
        });
        await Promise.all(promises);
        xlsxFile('./tripuser.xlsx')
          .then(async (rows) => {
            const columnNames = rows.shift();
            const promises = rows.map((row) => {
              const obj = {};
              row.forEach((cell, i) => {
                obj[columnNames[i]] = cell;
              });
              return TripUser.create(obj);
            });
            await Promise.all(promises);
          });
      });
=======
xlsxFile('./travelapp_spreadsheet.xlsx').then(async (rows) => {
  const columnNames = rows.shift();
  const promises = rows.map((row) => {
    const obj = {};
    row.forEach((cell, i) => {
      obj[columnNames[i]] = cell;
    });
    return Destinations.create(obj);
>>>>>>> 4143dd5a7cb48818ee05ed1dac911587a79b487a
  });
  await Promise.all(promises);
});
