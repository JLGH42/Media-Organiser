const express = require('express');
const app = express();
const port = 1998;

const hbs = require('hbs');
const bodyParser = require('body-parser');
const path = require('path');
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

//test route
var mediaFileRoute = require('./routes/mediaFiles.js');
app.use('/', urlencodedParser, mediaFileRoute);

app.listen(port, () => console.log(`Server Running on Port ${port}`));