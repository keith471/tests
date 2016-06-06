
var Q = require('q');
var express = require('express');
var router = express.Router();

// Q doesn't work with the asynchronous function in there
router.get('/1', function (req, res) {
    Q()
    .then(function() {
        console.log("1")
    })
    .then(function() {
        var posts = {
            name: "John",
            age: 36
        };
        var options = {
            sql: "INSERT INTO ?? SET ?",
            values: ['people', posts]
        };
        mysqllib.mysqlInteract(options, function(err, result, fields) {
            if (err) {
                throw new Error("Oh shit");
            }
            console.log("2");
        });
    })
    .then(function() {
        console.log("3");
        return 4;
    })
    .then(function(input) {
        console.log(input);
        res.status(200).json({status: "success"});
    })
    .catch(function(error) {
        console.log(error.message);
    })
    .done();
});

// q works in this example
router.get('/2', function (req, res) {
    Q()
    .then(function() {
        console.log("1")
    })
    .then(function() {
        console.log("2");
    })
    .then(function() {
        console.log("3");
        return 4;
    })
    .then(function(input) {
        console.log(input);
        res.status(200).json({status: "success"});
    })
    .catch(function(error) {
        console.log(error.message);
    })
    .done();
});

module.exports = router;
