
var mysql = require('mysql');
var express = require('express');
var router = express.Router();

// Create a connection pool. This pool is for executing user requests.
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database		  : 'test_db'
});

// Get a connection from the pool
var mysqlInteract = function(options, completion) {
	pool.getConnection(function(err, connection) {
	    // TODO: handle error
	    if (err) {
            completion(err);
	    } else {
			connection.query(options, function(err, results, fields) {
				connection.release();
				completion(err, results, fields);
			});
		}
	});
}

// Create a separate connection (i.e. not a connection from the pool) in order to
// run a transaction on the database
var connectForTransaction = function(completion) {
    // Create a connection
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'test_db'
    });

    connection.connect(function(err) {
        if (err) {
            console.log('Error connecting to database: ' + err);
            completion(err);
        } else {
            // Return the connection to the caller
            completion(null, connection);
        }
    });
}

// Create a separate connection to run a single service query (one that does not
// require a transaction)
var performServiceQuery = function(options, completion) {
    // Create a connection
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'test_db'
    });

    connection.connect(function(err) {
        if (err) {
            connection.end(function(err) {
                if (err) {
                    console.log("Error ending maintenance connection: " + err);
                } else {
                    console.log("Successfully ended maintenance connection");
                }
            });
            completion(err);
            return;
        }
        connection.query(options, function(err, results, fields) {
            connection.end(function(err) {
                if (err) {
                    console.log("Error ending maintenance connection: " + err);
                } else {
                    console.log("Successfully ended maintenance connection");
                }
            });
            completion(null, err, results, fields);
        });
    });
}

var terminateConnection = function(connection) {
    connection.end(function(err) {
        if (err) {
            console.log("Error ending connection: " + err);
        } else {
            console.log("Successfully ended connection");
        }
    });
}


router.get('/', function(req, res) {
    var params = {
        name: "Phil",
        age: 33,
    };
    var post = {
        name: params.name,
        age: params.age,
        hobby: params.hobby
    };
    var options = {
        sql: "INSERT INTO ?? SET ?",
        values: ['people', post]
    };
    mysqlInteract(options, function(err, result, fields) {
        if (err) {
            res.send("Error");
            return;
        }
        res.json(result);
    });
});

router.post('/', function(req, res) {
    var posts = {
        name: req.body.name,
        age: req.body.age
    };
    var options = {
        sql: "INSERT INTO ?? SET ?",
        values: ['people', posts]
    };
    mysqlInteract(options, function(err, result, fields) {
        if (err) {
            res.send("Error");
            return;
        }
        res.json(result);
    });
});

module.exports = router;
