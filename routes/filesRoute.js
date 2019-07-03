const os = require('os');
const fs = require('fs');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const mediaFileModel = require('../model/mediaFileModel.js');
const functions = require('../middleware/session.js');
const folderCreate = require('../middleware/asyncFolderCreate.js');

//asynchronously creates uploads folder for saving files
const homeDir = os.userInfo().homedir;
var dir = `${homeDir.split('C:')[1]}\/uploads/`;
folderCreate.asyncFolderCreate(dir);
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${homeDir}\/uploads/`)
    },
    preservePath: true,
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    },
})
var upload = multer({
    storage: storage,
})

var filesContainer = [];
router.get('/', (req, res) => {
    //rendering files as a helper to be used in partial block 
    res.render('layout.hbs', {
        filename: filesContainer.filename,
        path: filesContainer.path
    });
});

//single uploads
router.post('/upload', upload.single('mediaFile'), (req, res, next) => {
    const file = req.file;
    const body = req.body;
    const title = file.originalname;
    const comments = body.mediaUploadComments;
    const filePath = req.file.path;
    // initialise the locals settings object
    req.settings = {
        username: os.userInfo().username,
        date: new Date().toISOString(),
        title,
        comments,
        bufferPath,
        catID = 4
    };
    //single files | check if file obj is defined
    if (!file) {
        fs.readFile(`${file.originalname}`, 'utf-8', (err, data) => {
            if (err) {
                res.send('unable to upload')
            };
            console.log(data);
        });
        //push all media files to the container
        filesContainer.push({
            filename: title,
            path: filePath
        })
        var bufferPath = new Buffer(filePath, 'base64');
        mediaFileModel.insertMedia(title, comments, bufferPath, catID)
            //.then executes the await sequence through Promises
            .then(() => {
                functions.saveSettings(JSON.stringify(req.settings))
                next();
            }).catch((err) => {
                console.log(err);
                return res.redirect('/')
            })
    }
    res.redirect('/');
    next();
})
router.get('/upload', (req, res) => {
    res.render('layout.hbs', {})
})

module.exports = router