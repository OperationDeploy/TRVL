const xlsxFile = require('read-excel-file/node');
const { Destinations } = require('./server/db');

xlsxFile('./travelapp_spreadsheet.xlsx').then(async (rows) => {
  const columnNames = rows.shift();
  const promises = rows.map((row) => {
    const obj = {};
    row.forEach((cell, i) => {
      obj[columnNames[i]] = cell;
    });
    return Destinations.create(obj);
  });
  await Promise.all(promises);
});
