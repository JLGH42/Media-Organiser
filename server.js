const express = require('express');
const app = express();
const port = 1998;

const hbs = require('hbs');
const path = require('path');
const partialsPath = path.join(__dirname + '/views/');
const viewsPath = path.join(__dirname + '/views/templates');
const publicPath = path.join(__dirname + '/views/public');

app.engine('hbs', require('hbs').__express);
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

//Routing in here for front end
app.get('/', (req, res) => res.send('hello'));

app.listen(port, () => console.log(`Server Running on Port ${port}`));