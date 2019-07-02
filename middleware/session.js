const express = require('express');
const app = express();
const os = require('os');
const fs = require('fs');
const homeDir = os.userInfo().homedir;
// const logger = require('../config/winston.js');

const path = require('path');
const middleware = require('./asyncFolderCreate.js');
const dir = `${homeDir}/session`;

function saveSettings(settings, callback) {
    middleware.asyncFolderCreate(dir);
    var file = 'session.json';
    var filePath = path.join(dir, file);
    var exists = (filePath) => fs.access(filePath, fs.constants.F_OK, (err) => {
        console.log(`${filePath} ${err ? 'does not exist' : 'exists'}`);
    });
    if (exists(filePath) == 'exists') {
        fs.appendFile(filePath, settings, function(err) {
            if (err) {
                console.info("There was an error attempting to save your data.");
                console.warn(err.message);
                return;
            } else {
                console.log('Updating Sessions File...');
            }
        })
    } else {
        fs.writeFile(filePath, settings, function(err) {
            if (err) {
                console.info("There was an error attempting to save your data.");
                console.warn(err.message);
                next();
                return;
            } else if (callback) {
                console.log('Creating sessions file and saving');
            }
        });
    }
}


function loadState() {
    var file = 'session.json';
    var filePath = path.join(dir, file);
    fs.readFile(filePath, 'utf-8', function(err, data) {
        if (err) {
            console.info("An Error occured while loading your data from: " + file);
            console.warn(err.message);
            // next();
            return;
        } else {
            console.log("Loading State...");
            console.log(data);
            //already a stirng
            let state = data;
            return state;
        }
    });
}
// app.use((req, res, next) => {
//     var seshData = [];
//     var user = {
//         "username": os.userInfo().username,
//         "date": new Date().toISOString().
//         replace(/T/, ' '). // replace T with a space
//         replace(/\..+/, ''),
//     };
//     if (user) {
//         seshData.push(user);
//         for (let i = 0; i < seshData.length; i++) {
//             //obj to string
//             var data = JSON.stringify(seshData[i]);
//         }
//         folderCreate.asyncFolderCreate(dir);
//     }
//     fs.writeFile('session.json', data, (err) => {
//         if (err) console.log(err);
//         // string to obj
//         console.log(`Logged in as ${JSON.parse(data).username}`)
//     });

//     next()
// })

module.exports = app;