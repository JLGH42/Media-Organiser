const os = require('os');
const fs = require('fs');
const homeDir = os.userInfo().homedir;
const dir = `${homeDir.split('C:')[1]}\/uploads/images` |
    console.log(dir)
fs.mkdir(dir, { recursive: true }, function(err) {
    if (err) {
        console.log('failed to create directory', err);
    } else {
        console.log('filww')
    }
});
//return current user
// if (serverFile.listening() == true) {
//     console.log(os.userInfo().username);

// }