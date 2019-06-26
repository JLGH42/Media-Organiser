const winston = require('winston');
const path = require('path');
var logRoot = path.join(__dirname + 'logs');

var options = {
    session: {
        level: 'info',
        filename: `${logRoot}/session.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    errors: {
        level: 'error',
        filename: `${logRoot}/errors.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.Logger({
    transports: [
        new winston.transports.File(options.session),
        new winston.transports.File(options.errors),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger;