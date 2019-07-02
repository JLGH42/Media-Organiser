const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const categoryModel = require('../model/categoryModel.js');

var categoryContainer = [];
router.get('/', (req, res) => {
        res.render('layout.hbs', {
            categories: categoryContainer
        })
    })
    //single uploads | upload.none for parasing multi-part form data
router.post('/', upload.none(), (req, res, next) => {
    const body = req.body;
    const name = body.categoryUploadName;
    console.log(body);

    //send body info to partial Container
    if (typeof body != 'undefined') {
        categoryContainer.push({
                categories: name
            })
            //insert values to database and declare redirect/next handler
        categoryModel.insertCategory(name)
            .then(() => {
                //redirect to where form is posting to, showing the new category
                res.redirect('/');
                next();
                //if error then log it and return user to homepage
            }).catch((err) => {
                console.log(err)
                throw err
            })
    } else {
        return res.redirect();
    }
})
router.get('/', (req, res) => {
    res.render('layout.hbs', {
        categories: categoryContainer
    })
})

module.exports = router