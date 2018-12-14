var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public/dist/public')));

// Routes
require('./server/config/routes.js')(app);

app.listen(8000);