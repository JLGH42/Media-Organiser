const express = require('express');
const router = express.Router();
const multer = require('multer');
const os = require('os');
const fs = require('fs');
const mkdirp = require('mkdirp');

var catID;
const mediaFileModel = require('../model/mediaFileModel.js');
const homeDir = os.userInfo().homedir;
const dir = `${homeDir.split('C:')[1]}\/uploads/images`;

//create the directory if it has not been created already.
var exists = (dir) => fs.access(dir, fs.constants.F_OK, (err) => {
    console.log(`${dir} ${err ? 'does not exist' : 'exists'}`);
});
mkdirp(dir, function(err) {
    if (err) console.error(err)
    else {
        if (exists(dir) == 'exists') {
            console.log('dir created' + ' ' + Date.now())
        } else {
            console.log('Directory has already been created')
        }
    }
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${homeDir}\/uploads/images`)
    },
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
    //rendering files as a helper to be used in partial block
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
    console.log(fileName + '     :    ' + comments);

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
        if (!file.mimetype) {
            file.mimetype.includes('image') ? catID = 4 : catID;
            mediaFileModel.loadPhotoCat(catID);
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

module.exports = router;