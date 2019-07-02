const os = require('os');
const fs = require('fs');
const homeDir = os.userInfo().homedir;
// const dir = `${homeDir.split('C:')[1]}\/uploads/images`;
const filePath = `${homeDir}/uploads/fileRendering.png`
const open = require('open');
let model = require('./model/mediaFileModel.js');

model.getFileByID(4);

const path = require('path');
const dir = `${homeDir}/session`

fs.appendFile('session.json', JSON.stringify({ test: 'test' }), (err) => err ? err : console.log('data sent'))

// function loadState() {
//     var file = 'session.json';
//     var filePath = path.join(dir, file);
//     fs.readFile(filePath, 'utf-8', function(err, data) {
//         if (err) {
//             console.info("An Error occured while loading your data from: " + file);
//             console.warn(err.message);
//             // next();
//             return;
//         } else {
//             console.log("Loading State...");
//             console.log("data");
//             let state = data;
//             return data;
//         }
//     });
// }
// loadState();


const middleware = require('./middleware/asyncFolderCreate.js');
// var settings = {
//     "language": "en",
//     "theme": "dark"
// };

// function saveSettings(settings, error) {
//     middleware.asyncFolderCreate(dir)

//     var file = 'session.json';
//     var filePath = path.join(dir, file);
//     fs.writeFile(filePath, settings, function(err) {
//         if (err) {
//             console.info("There was an error attempting to save your data.");
//             console.warn(err.message);
//             return;
//         } else if (error) {
//             error();
//         }
//     });
// }
// saveSettings(JSON.stringify(settings), function() {
//     console.log('Settings saved');
// });
// fs.open(path, 'w', function(err, fd) {
//     err ? console.log(err) : console.log('file opened: ' + path)
// });
// var context = { name: 'Jordan' }
// function getValues(context) {
//     let data = Object.values(context);
//     for (let i = 0; i < data.length; i++) {
//         const element = data[i];
//         console.log(element);
//     }
// }

// getValues(context)


// const categoryModel = require('./model/categoryModel.js');
// var name = 'nameTest'
// categoryModel.insertCategory(name);

// const open = require('open');

function openFile(filePath) {
    // filePath = req.file.path;
    (async() => {
        await open(filePath, { wait: false });
        console.log('The File viewer app closed');

        // Specify the app to open in
        // await open('https://sindresorhus.com', {app: 'firefox'});

        // Specify app arguments
        // await open('https://sindresorhus.com', {app: ['google chrome', '--incognito']});
    })();
}
// openFile(filePath);

// var exists = (dir) => fs.access(dir, fs.constants.F_OK, (err) => {
//     console.log(typeof `${dir} ${err ? 'does not exist' : 'exists'}`);
// });
// exists(dir);
//return current user
// if (serverFile.listening() == true) {
//     console.log(os.userInfo().username);

//