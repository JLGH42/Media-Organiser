const os = require('os');
const fs = require('fs');
const homeDir = os.userInfo().homedir;
const open = require('open');
const dir = `${homeDir.split('C:')[1]}\/uploads/images`;

var nwGui = require('nw.gui');
nwGui.Shell.openItem(`${homeDir}/uploads/images/fileRendering.png`);

// var exists = (dir) => fs.access(dir, fs.constants.F_OK, (err) => {
//     console.log(typeof `${dir} ${err ? 'does not exist' : 'exists'}`);
// });
// exists(dir);
//return current user
// if (serverFile.listening() == true) {
//     console.log(os.userInfo().username);

// }