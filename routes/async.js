
var async = require('async');
var express = require('express');
var router = express.Router();

router.get('/1', function (req, res) {
    async.waterfall([
        function(callback) {
            console.log(1);
            callback(null, 2);
        },
        function(value, callback) {
            console.log(value);
            callback(null, 3, 4);
        },
        function(value, anotherValue, callback) {
            console.log(value);
            console.log(anotherValue);
            callback(null, 5)
        }
    ],
    function(err, results) {
        console.log("Err: " + err);
        console.log(JSON.stringify(results)); // 5
        res.send("Done");
    });
});

router.get('/2', function(req, res) {
    async.series([
        function(callback) {
            console.log(1);
            callback(null, 2);
        },
        function(callback) {
            callback(null, 3, 4);
        },
        function(callback) {
            callback(null, 5)
        }
    ],
    function(err, results) {
        if (err) {
            console.log("Respond to error");
            res.send("Error");
        } else {
            console.log(JSON.stringify(results)); // [2,[3,4],5]
            res.send("Done");
        }
    });
});

router.get('/3', function(req, res) {
    async.series([
        function(callback) {
            console.log(1);
            callback(null, 2);
        },
        function(callback) {
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
                    console.log(2);
                    callback(new Error("Oh shit"));
                    return;
                }
                console.log(2);
                callback(null, result);
            });
        },
        function(callback) {
            console.log(3);
            callback(null, 5)
        }
    ],
    function(err, results) {
        if (err) {
            console.log("Respond to error");
            res.send("Error");
        } else {
            console.log(JSON.stringify(results)); // [2,[3,4],5]
            res.send("Done");
        }
    });
});

router.get('/4', function(req, res) {
    async.waterfall([
        async.apply(myFirstFunction, 'zero'),
        async.apply(mySecondFunction, 'cool'),
        myLastFunction,
    ], function (err, result) {
        // result now equals 'done'
        if (err) {
            console.log("Respond to error");
            res.send("Error");
        } else {
            console.log(JSON.stringify(result)); // "done"
            res.send("Done");
        }
    });
    function myFirstFunction(arg1, callback) {
        // arg1 now equals 'zero'
        callback(null, 'one', 'two');
    }
    function mySecondFunction(arg1, arg2, arg3, callback) {
        // arg1 now equals 'cool', arg2 now equals 'one', and arg3 now equals 'two'
        console.log(arg1);
        console.log(arg2);
        console.log(arg3);
        callback(null, 'three');
    }
    function myLastFunction(arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
    }
});

router.get('/5', function(req, res) {
    async.series([
        async.apply(myFirstFunction, 'zero'),
        async.apply(mySecondFunction, 'cool'),
        myLastFunction,
    ], function (err, result) {
        if (err) {
            console.log("Respond to error");
            res.send("Error");
        } else {
            console.log(JSON.stringify(result)); // [["one","two"],"three","done"]
            res.send("Done");
        }
    });
    function myFirstFunction(arg1, callback) {
        callback(null, 'one', 'two');
    }
    function mySecondFunction(arg1, callback) {
        console.log(arg1);
        callback(null, 'three');
    }
    function myLastFunction(callback) {
        callback(null, 'done');
    }
});

module.exports = router;
