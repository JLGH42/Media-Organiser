require('dotenv').config();
//NPM
const express = require('express');
const app = express();
const port = 1998;
const hbs = require('hbs');
const bodyParser = require('body-parser');
const path = require('path');
//Built in
const os = require('os');
const fs = require('fs');

const sessions = require('./middleware/session.js');
const partialsPath = path.join(__dirname + '/views/partials');
const viewsPath = path.join(__dirname + '/views/templates');
const publicPath = path.join(__dirname + '/views/public');

// const uuid = require('uuid/v4');
// const session = require('express-session');

app.engine('hbs', require('hbs').__express);
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.use(bodyParser.json()); // for parsing application/json
var urlencodedParser = bodyParser.urlencoded({
    extended: true,
});

hbs.registerHelper = ('imageClick', function() {
    var client = new XMLHttpRequest();
    client.onreadystatechange = function() {
        if (this.readyState == this.HEADERS_RECEIVED) {
            var imagePath = client.getResponseHeader("ImagePath");
            console.log(imagePath);
            if (imagePath != my_expected_type) {
                client.abort();
            }
        }
    }
    $("button.btn.fileSelect").click(function openImage(imagePath) {
        (async() => {
            await open(imagePath, {
                wait: false
            });
            console.log('The image viewer app closed');

            // Specify the app to open in      
            // await open('https://sindresorhus.com', {app: 'firefox'});
            // Specify app arguments
            // await open('https://sindresorhus.com', {app: ['google chrome', '--incognito']});
        });
    })

})

//test route
var mediaFileRoute = require('./routes/mediaFiles.js');
var userRoute = require('./routes/user.js');
app.use('/', sessions)
app.use('/', urlencodedParser, mediaFileRoute);
// app.use('/', urlencodedParser, userRoute);


app.listen(port, () => console.log(`Server Running on Port ${port}`));