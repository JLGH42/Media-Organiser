const mysql = require('./db.js');
const _ = require('lodash');

var insertMedia = async(fileName, comments, meta_data) => {
    return new Promise((resolve, reject) => {
        var query;
        query = `INSERT INTO media_file (title, comments, meta_data) VALUES (?, ?, ?)`;
        let values = [fileName, comments, meta_data];

        mysql.query(query, values, function(error, res, fields) {
            if (error) {
                console.log('ERROR WITH QUERY')
                return reject(error)
            } else {
                if (!res.affectedRows) {
                    return reject('Cannot Insert Media File')
                } else {
                    /* res = RowDataPacket */
                    console.log(res.affectedRows);
                    return resolve(res);
                }
            }
        });
    })
}

module.exports = {
    insertMedia,
}