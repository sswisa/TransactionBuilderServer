"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const dbURI = "mongodb://127.0.0.1/house_hold_analytics";
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4
};
exports.dbConnection = mongoose.createConnection(dbURI, options);
exports.dbConnection.on('error', function (err) {
    console.log('MONGOOSE ERROR');
    console.log(err);
});
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBc0M7QUFDdEMsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFdkMsTUFBTSxLQUFLLEdBQUcsMENBQTBDLENBQUM7QUFFekQsTUFBTSxPQUFPLEdBQUc7SUFDWixlQUFlLEVBQUUsSUFBSTtJQUNyQixjQUFjLEVBQUUsSUFBSTtJQUNwQixTQUFTLEVBQUUsS0FBSztJQUNoQixjQUFjLEVBQUUsTUFBTSxDQUFDLFNBQVM7SUFDaEMsaUJBQWlCLEVBQUUsR0FBRztJQUN0QixRQUFRLEVBQUUsRUFBRTtJQUVaLGdCQUFnQixFQUFFLENBQUM7SUFDbkIsZ0JBQWdCLEVBQUUsS0FBSztJQUN2QixlQUFlLEVBQUUsS0FBSztJQUN0QixNQUFNLEVBQUUsQ0FBQztDQUNaLENBQUM7QUFFUyxRQUFBLFlBQVksR0FBd0IsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztBQUV6RixvQkFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFHO0lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFBO0FBRUYsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDakIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1FBQ2hGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9