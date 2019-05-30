const os = require('os');
const serverFile = require('./server.js');

//return current user
if (serverFile.listening() == true) {
    console.log(os.userInfo().username);

}