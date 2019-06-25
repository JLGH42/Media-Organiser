const os = require('os');
const fs = require('fs');
const homeDir = os.userInfo().homedir;
const dir = `${homeDir.split('C:')[1]}\/uploads/images`;
const imageDir = `${homeDir}/uploads/images/fileRendering.png`

const open = require('open');

function openImage(imageDir) {
    (async() => {
        await open(imageDir, { wait: false });
        console.log('The image viewer app closed');

        // Specify the app to open in
        // await open('https://sindresorhus.com', {app: 'firefox'});

        // Specify app arguments
        // await open('https://sindresorhus.com', {app: ['google chrome', '--incognito']});
    })();
}
openImage(imageDir);

// var exists = (dir) => fs.access(dir, fs.constants.F_OK, (err) => {
//     console.log(typeof `${dir} ${err ? 'does not exist' : 'exists'}`);
// });
// exists(dir);
//return current user
// if (serverFile.listening() == true) {
//     console.log(os.userInfo().username);

//