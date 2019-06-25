//create the directory if it has not been created already.
const mkdirp = require('mkdirp');
const fs = require('fs');
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

module.exports = {
    asyncFolderCreate
}