import mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const dbURI = "mongodb://127.0.0.1/house_hold_analytics";

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

export let dbConnection: mongoose.Connection = mongoose.createConnection(dbURI, options);

dbConnection.on('error', function (err) {
    console.log('MONGOOSE ERROR');
    console.log(err);
})

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});