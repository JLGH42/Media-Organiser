// const mysql = require('../model/db.js');
// const _ = require('lodash');

// var  = (id) => {
//     return new Promise((resolve, reject) => {
//         var query;
//         query = `SELECT * FROM user WHERE id = ?`;
//         let values = [id];
//         mysql.query(query, values, function (error, res, fields) {
//             if (error) {
//                 return reject(error)
//             } else {
//                 console.log(res);
//                 /* res = RowDataPacket */
//                 return resolve(res);
//             }
//         });
//     })
// }