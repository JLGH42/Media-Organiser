const mysql = require('./db.js');
const _ = require('lodash');

var insertCategory = async(name) => {
    return new Promise((resolve, reject) => {
        var query;
        query = `INSERT INTO category (name) VALUES (?)`;
        let values = [name];
        mysql.query(query, values, function(error, res, fields) {
            if (error) {
                console.log('ERROR WITH QUERY')
                return reject(error)
            } else {
                if (!res.affectedRows) {
                    return reject('Cannot Insert Category')
                } else {
                    /* res = RowDataPacket */
                    console.log('Rows Affected: ' + res.affectedRows);
                    return resolve(res);
                }
            }
        });
    })
}

var loadCategoryFiles = async(id) => {
    return new Promise((resolve, reject) => {
        var query;
        query = `SELECT * FROM media_file.bufferPath WHERE media_file.id = category.id`;
        mysql.query(query, function(error, res, fields) {
            if (error) {
                console.log('ERROR WITH QUERY')
                return reject(error)
            } else {
                if (!res.affectedRows) {
                    return reject('Cannot Insert Category')
                } else {
                    /* res = RowDataPacket */
                    console.log(`Rows Affected: ${res.affectedRows}`);
                    return resolve(res);
                }
            }
        });
    })
}

// var updateCategories = async(catID) => {
//     return new Promise((resolve, reject) => {
//         var query;
//         query = `SELECT * title FROM media_file WHERE category.id = ?)`;
//         let values = [catID];
//         mysql.query(query, values, function(error, res, fields) {
//             if (error) {
//                 console.log('ERROR WITH QUERY')
//                 return reject(error)
//             } else {
//                 if (!res) {
//                     return reject('Cannot Insert Media File')
//                 } else {
//                     Object.keys(res).forEach(function(key) {
//                         var row = res[key];
//                         console.log(row.name)
//                     });
//                     return resolve(res);
//                 }
//             }
//         });
//     })
// }

// var loadPhotoCat = async(catID) => {
//     return new Promise((resolve, reject) => {
//         var query;
//         query = `SELECT * title FROM media_file WHERE category.id = ?)`;
//         let values = [catID];
//         mysql.query(query, values, function(error, res, fields) {
//             if (error) {
//                 console.log('ERROR WITH QUERY')
//                 return reject(error)
//             } else {
//                 if (!res) {
//                     return reject('Cannot Insert Media File')
//                 } else {
//                     Object.keys(res).forEach(function(key) {
//                         var row = res[key];
//                         console.log(row.name)
//                     });
//                     return resolve(res);
//                 }
//             }
//         });
//     })
// }



module.exports = {
    insertCategory,
    loadCategoryFiles,
    // loadPhotoCat
}