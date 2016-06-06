
var knexMain = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test_db'
  },
  pool: {
    min: 0,
    max: 20
  }
});
var knexMaintenance = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test_db'
  },
  pool: {
    min: 0,
    max: 10
  }
});

var express = require('express');
var router = express.Router();



module.exports = router;
