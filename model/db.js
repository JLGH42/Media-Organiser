'user strict';

const mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'media-organiser-sp'
});

connection.connect((err) => {
    if (err) {
        console.log('Cannot Connect to MySql Database')
        throw err;
    }
    console.log('Connected to database');
});

module.exports = connection;