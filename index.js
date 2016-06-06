var express = require('express');
var bodyParser = require('body-parser');

// Routes
var q = require('./routes/q');
var async = require('./routes/async');
var knex = require('./routes/knex');
var errorExtension = require('./routes/error-extension');
var nodeMysql = require('./routes/node-mysql');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/async', async);
app.use('/q', q);
app.use('/knex', knex);
app.use('/error-extension', errorExtension);
app.use('/node-mysql', nodeMysql);

app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
});
