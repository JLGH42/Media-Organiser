// const mediaFileModel = require('../model/mediaFileModel.js');

// //async waits for request 
// exports.insertMedia = async(req, res, next) => {
//     var body = req.body;
//     var file = req.file;
//     console.log(file + '         ' + JSON.stringify(body));

//     let originalName = file.originalName;
//     let comments = body.mediaUploadComments;
//     let meta_data = '';

//     mediaFileModel.insertMedia(originalName, comments, meta_data)
//         //.then executes the await sequence through Promises
//         .then(() => {
//             res.redirect('/');
//             next();
//         }).catch((err) => {
//             console.log(err);
//             return res.redirect('/')
//         })
// }