const os = require('os');
const fs = require('fs');

exports.logUser = (req, res) => {
    const data = { User: os.userInfo() };
    // fs.writeFile('logger.json', JSON.stringify(data), (err) => {
    //     if (err) throw err;
    // })
    console.log(data);
    res.render('layout.hbs');
}

module.exports = {
    logUser
}