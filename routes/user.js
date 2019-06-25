// const express = require('express');
// const uuid = require('uuid/v4');
// const session = require('express-session');
// const router = express.Router();

// router.get('/', (req, res) => {

//     res.render('layout', { errors: req.session.errors })
//     req.session.errors = null;
// })
// router.post('/upload/', function(req, res) {
//     let name = req.body.name;
//     let email = req.body.email;
//     req.checkBody('name', 'Name is required').notEmpty();
//     req.checkBody('email', 'Email is required').notEmpty();
//     req.checkBody('email', 'Please enter a valid email').isEmail();

//     const errors = req.validationErrors();
//     if (errors) {
//         req.session.errors = errors;
//         res.redirect('/user');
//     } else {
//         req.session.success = true;
//         res.redirect('/');
//     }

// });

// module.exports = router;