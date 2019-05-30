const express = require('express');
const router = express.Router();
const logger = require('../controller/logger.js');
const data = { User: 'jordan' };

console.log(typeof logger.logUser);
router.get('/', (req, res) => {
    const data = { User: os.userInfo() };
    // fs.writeFile('logger.json', JSON.stringify(data), (err) => {
    //     if (err) throw err;
    // })
    console.log(data);
    res.render('layout.hbs');
});
module.exports = router;