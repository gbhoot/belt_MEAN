var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session')({
        secret: "ssssssssssssssshhhh",
        autoSave: true,
        resave: false,
        saveUninitialized: true
    }),
    flash = require('express-flash');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public/dist/public')));

// Routes
require('./server/config/routes.js')(app);

// Port listening on
app.listen(8000);