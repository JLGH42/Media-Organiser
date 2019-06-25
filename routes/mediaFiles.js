const express = require('express');
const router = express.Router();
const multer = require('multer');
const os = require('os');
const fs = require('fs');

var catID;
const mediaFileModel = require('../model/mediaFileModel.js');
const folderCreate = require('../middleware/asyncFolderCreate');
const homeDir = os.userInfo().homedir;

var dir = `${homeDir.split('C:')[1]}\/uploads/`;
//asynchronously creates uploads folder for saving files
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

    //imageFilter
    // fileFilter: (req, file, cb) => {
    //     if ((file.mimetype == 'image/png') || (file.mimetype == 'image/jpeg')) {
    //         cb(null, true)
    //     } else {
    //         return cb(new Error('Incorrect file type, try with different file.'))
    //     }
    // }
})

var filesContainer = [];
router.get('/', (req, res) => {
    //rendering files as a helper to be used in partial block // logging user session setting errors to null 
    // console.log(req.sessionID)
    res.render('layout.hbs', {
        files: filesContainer
    });
});

//single uploads
router.post('/upload', upload.single('mediaFile'), (req, res, next) => {
    const file = req.file;
    const body = req.body;
    const fileName = file.originalname;
    const comments = body.mediaUploadComments;
    const filePath = req.file.path;

    //single files | check if file obj is defined
    if (!file) {
        fs.readFile(`${file.originalname}`, 'utf-8', (err, data) => {
            if (err) {
                res.send('unable to upload')
            };
            console.log(data);
        });
    }
    //push all media files to the container
    if (typeof file != 'undefined') {
        filesContainer.push({
                files: req.file.originalname,
            })
            ///header on response
        res.set('ImagePath', filePath);
        if (file.mimetype) {
            file.mimetype.includes('image') ? catID = 4 : catID;
        }
        mediaFileModel.insertMedia(fileName, comments, catID)
            //.then executes the await sequence through Promises
            .then(() => {
                next();
            }).catch((err) => {
                console.log(err);
                return res.redirect('/')
            })
    }
    res.redirect('/');
    next();
})
router.get('/', (req, res) => {
    res.render('layout.hbs', {})
})

module.exports = router