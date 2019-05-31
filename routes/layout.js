const express = require('express');
const router = express.Router();
const logger = require('../controller/logger.js');
const multer = require('multer');
const os = require('os');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'views/public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({
    storage: storage,
})

router.get('/', (req, res) => {
    const data = {
        User: os.userInfo()
    };
    res.render('layout.hbs');
});

router.post('/upload', (req, res) => {
    const file = req.file;
    console.log(file);
    const fileText = req.body.mediaUploadComments;

    var img = fs.readFileSync(`${file}`)
    var encode_image = img.toString('base64');
    var finalImg = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_image, 'base64')
    };
    console.log(finalImg);

    // var img = fs.readFileSync(`${file}`, (err, data) => {
    //     if (err) throw err;
    //     console.log(data);
    //     console.log(img);
    // });
    // const input = document.querySelector('input.media-file-upload');
    // input.on('submit', (e) => {
    //     console.log(`${file} : ${fileText}`);
    // })

    res.redirect('/upload');
})
router.get('/upload', (req, res) => res.send('successful upload'))
module.exports = router;