const express = require('express');
const app = express();
const os = require('os');
const fs = require('fs');
const folderCreate = require('../middleware/asyncFolderCreate');
const homeDir = os.userInfo().homedir;

var dir = `${homeDir.split('C:')[1]}\/session/`;

app.use((req, res, next) => {
    var seshData = [];
    var user = {
        "username": os.userInfo().username,
        "date": new Date().toISOString().
        replace(/T/, ' '). // replace T with a space
        replace(/\..+/, ''),
    };
    if (user) {
        seshData.push(user);
        for (let i = 0; i < seshData.length; i++) {
            //obj to string
            var data = JSON.stringify(seshData[i]);
        }
        folderCreate.asyncFolderCreate(dir);
    }
    fs.writeFile('session.json', data, (err) => {
        if (err) console.log(err);
        // string to obj
        console.log(`Logged in as ${JSON.parse(data).username}`)
    });

    next()
})

module.exports = app;