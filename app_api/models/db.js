var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/Prezigen';
if(process.env.NODE_ENV === 'production') {
	dbURI=process.env.MONGODB_URI;
}

mongoose.connect(dbURI); 
mongoose.connection.on('connected', function() {
	console.log('mongoose connected to %s', dbURI);
});
mongoose.connection.on('error', function(err) {
	console.log('mongoose connection error: %s', err);
});
mongoose.connection.on('disconnected', function() {
	console.log('mongoose disconnected');
});

gracefulShutdown=function(msg, callback) {
	mongoose.connection.close(function(){
		console.log('mongoose disconnected through '+msg);
		callback();
	});
};

process.once('SIGUSR2', function() {
	gracefulShutdown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});
process.on('SIGINT', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	});
});
process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app shutdown', function() {
		process.exit(0);
	});
});
/*
var readline=require("readline");
if(process.platform==='win32') {
	var rl=readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.on('SIGINT', function() {
		process.emit('SIGINT');
	});
};
*/
require("./suppliers.js");
require("./products.js");
require("./users.js");