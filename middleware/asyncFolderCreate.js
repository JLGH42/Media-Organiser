//create the directory if it has not been created already.
const mkdirp = require('mkdirp');
const fs = require('fs')
const os = require('os')
const homeDir = os.userInfo().homedir;
var dir = `${homeDir.split('C:')[1]}\/session/`;;

var asyncFolderCreate = (dir) => {
        var exists = (dir) => fs.access(dir, fs.constants.F_OK, (err) => {
            console.log(`${dir} ${err ? 'does not exist' : 'exists'}`);
        });
        mkdirp(dir, function(err) {
            if (err) console.error(err)
            else {
                if (exists(dir) == 'exists') {
                    console.log('dir created' + ' ' + Date.now())
                } else {
                    console.log('Directory has already been created')
                }
            }
        });
    }
    // asyncFolderCreate(dir);

module.exports = {
    asyncFolderCreate
}