const express = require('express');
const router = express.Router();
const logger = require('../controller/logger.js');
const multer = require('multer');
const os = require('os');
const fs = require('fs');
const homeDir = os.userInfo().homedir;

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //create the directory if it has not been created already.
        // try {
        //     stat = fs.statSync(newDestination);
        // } catch (err) {
        //     fs.mkdirSync(newDestination);
        // }
        cb(null, `${homeDir}\/uploads/images`)
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    },
})
var upload = multer({
    storage: storage,
    //imageFilter
    fileFilter: (req, file, cb) => {
        if ((file.mimetype !== 'image/png') || (file.mimetype !== 'image/jpeg')) {
            cb(null, true)
        } else {
            return cb(new Error('Incorrect file type, try with different file.'))
        }
    }
})

var filesContainer = [];
router.get('/', (req, res) => {
    res.render('layout.hbs', {
        files: filesContainer
    });
});

router.post('/upload', upload.single('mediaFile'), (req, res, next) => {
    const file = req.file;
    const fileText = req.body.mediaUploadComments;
    console.log(fileText);

    //single files | check if file obj is defined
    if (!file) {
        fs.readFile(`${file.originalname}`, 'utf-8', (err, data) => {
            if (err) throw err;
            console.log(data);
        });
    }
    //push all media files to the container
    if (typeof file != 'undefined') {
        filesContainer.push({
            files: req.file.originalname,
        })
    }
    res.redirect('/');
    next();
})
router.get('/upload', (req, res) => res.send(`successfully uploaded file`))

module.exports = router;