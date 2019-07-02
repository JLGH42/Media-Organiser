const mysql = require('./db.js');
const _ = require('lodash');

var insertMedia = async(title, comments, bufferPath, catID) => {
    return new Promise((resolve, reject) => {
        var query;
        query = `INSERT INTO media_file (title, comments, buffer_path, category_id) VALUES (?, ?, ?, ?)`;
        let values = [title, comments, bufferPath, catID];
        mysql.query(query, values, function(error, res, fields) {
            if (error) {
                console.log('ERROR WITH QUERY')
                return reject(error)
            } else {
                if (!res.affectedRows) {
                    return reject('Cannot Insert Media File')
                } else {
                    /* res = RowDataPacket */
                    console.log(`Rows Affected: ${res.affectedRows}`);
                    return resolve(res);
                }
            }
        });
    })
}

var getFileByID = async(ID) => {
        return new Promise((resolve, reject) => {
            var query;
            query = `SELECT * media_file WHERE id = 4`;
            let values = [ID];
            mysql.query(query, values, function(error, res, fields) {
                if (error) {
                    console.log('ERROR WITH QUERY')
                    return reject(error)
                } else {
                    if (!res) {
                        return reject('Cannot Return Media File')
                    } else {
                        /* res = RowDataPacket */
                        Object.keys(res).forEach(function(key) {
                            var row = res[key];
                            console.log(row.name)
                        });
                        return resolve(res[0]);
                    }
                }
            });
        })
    }
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
    insertMedia,
    getFileByID
    // loadPhotoCat
}