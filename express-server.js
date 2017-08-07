'use strict';

var HOST = process.env.HOST || '0.0.0.0';
var PORT = process.env.PORT || 8181;
var express = require('express');

var app = express();

app.use('/assets',express.static(__dirname + '/client/build'));
app.use('/',express.static(__dirname + '/client/build'));

app.listen(PORT, HOST, function () {
    console.log('Started development server...');
    console.log('Listening at http://' + HOST + ':' + PORT);
});

app.on('error', function (err) {
    console.error('Error starting server: ' + err.message);
});

module.exports = app;
