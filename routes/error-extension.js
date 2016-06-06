
var express = require('express');
var router = express.Router();

// Extend express.response
express.response.success = function(message) {
    if (this.statusCode !== 200) {
        return this.json({message: message});
    } else {
        return this.status(500).json({message: message});
    }
}

// Error objects
function ApiError(message) {
    this.message = message;
}

// Extend javascript's Error object

// errors is a list of ApiErrors or a single ApiError
function ApiException(errors) {
    this.errors = errors instanceof Array ? errors : [errors];
    this.one = 1;
}
ApiException.prototype = Object.create(Error.prototype);
ApiException.prototype.constructor = ApiException;

router.get('/', function(req, res) {
    try {
        throw new ApiException(new ApiError("Shit!"));
    } catch (error) {
        console.log(typeof error);
        console.log(typeof error.errors);
        console.log(error.one);
        res.send(error.errors[0].message);
    }
});

module.exports = router;
