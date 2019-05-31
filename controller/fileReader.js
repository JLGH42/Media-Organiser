const os = require('os');
const fs = require('fs');

const input = document.querySelector('input.media-file-upload');
input.addEventListener('change', (e) => { console.log('UPLOADED') },
    false)

module.exports = {
    fileReader
}