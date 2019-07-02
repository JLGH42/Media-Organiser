require('dotenv').config();
//NPM
const express = require('express');
const app = express();
const port = 1998;
const hbs = require('hbs');
const bodyParser = require('body-parser');
const path = require('path');
const winston = require('winston');
const morgan = require('morgan');
//Built in
const fs = require('fs');

const partialsPath = path.join(__dirname + '/views/partials');
const viewsPath = path.join(__dirname + '/views/templates');
const publicPath = path.join(__dirname + '/views/public');

app.engine('hbs', require('hbs').__express);
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.use(bodyParser.json()); // for parsing application/json
var urlencodedParser = bodyParser.urlencoded({
    extended: true,
});

app.use(morgan('combined', { "stream": winston.stream }));
var logRoot = path.join(__dirname + '/logs');
var accessLogStream = fs.createWriteStream(path.join(logRoot + '/sessions.log'), { flags: 'a' })
    // setup the logger
app.use(morgan('combined', { write: accessLogStream }))

hbs.registerHelper('extractValues', function getValues(context) {
    let data = Object.values(context);
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        return element;
    }
});

hbs.registerHelper('openFile', function openFile(filePath) {
    (async() => {
        await open(filePath, { wait: false });
        console.log('The File viewer app closed');
    })();
});

//test route
var filesRoute = require('./routes/filesRoute.js');
var categoriesRoute = require('./routes/categoriesRoute.js');
app.use('/', urlencodedParser, filesRoute);
app.use('/', urlencodedParser, categoriesRoute);


app.listen(port, () => console.log(`Server Running on Port ${port}`));