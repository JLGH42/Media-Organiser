const express = require('express');
const router = express.Router();
const logger = require('../controller/logger.js');
const os = require('os');
const fs = require('fs');
// const data = { User: 'jordan' };

console.log(typeof logger.logUser);
router.get('/', (req, res) => {
    const data = {
        User: os.userInfo()
    };
    // fs.writeFile('logger.json', JSON.stringify(data), (err) => {
    //     if (err) throw err;
    // })
    // console.log(data);
    res.render('layout.hbs');
});
router.post('/upload', (req, res) => {
    const file = req.file.mediaFile;
    const fileText = req.body.mediaUploadComments;
    const input = document.querySelector('input.media-file-upload');
    input.on('submit', (e) => {
        console.log(`${file} : ${fileText}`);
    })

    res.redirect('/upload');
})
router.get('/upload', (req, res) => res.send('successful upload'))
module.exports = router;