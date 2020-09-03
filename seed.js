// const xlsxFile = require('read-excel-file/node');
// const {
//   Destinations, Trip, TripUser, User,
// } = require('./server/db');

// xlsxFile('./users.xlsx')
//   .then(async (rows) => {
//     const columnNames = rows.shift();
//     const promises = rows.map((row) => {
//       const obj = {};
//       row.forEach((cell, i) => {
//         obj[columnNames[i]] = cell;
//       });
//       return User.create(obj);
//     });
//     await Promise.all(promises);
//     xlsxFile('./trips.xlsx')
//       .then(async (rows) => {
//         const columnNames = rows.shift();
//         const promises = rows.map((row) => {
//           const obj = {};
//           row.forEach((cell, i) => {
//             obj[columnNames[i]] = cell;
//           });
//           return Trip.create(obj);
//         });
//         await Promise.all(promises);
//         xlsxFile('./tripuser.xlsx')
//           .then(async (rows) => {
//             const columnNames = rows.shift();
//             const promises = rows.map((row) => {
//               const obj = {};
//               row.forEach((cell, i) => {
//                 obj[columnNames[i]] = cell;
//               });
//               return TripUser.create(obj);
//             });
//             await Promise.all(promises);
//           });
//       });
//   });
