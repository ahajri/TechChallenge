var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended : true
})); 

var util = require('util');
var fs = require('fs');
var assert = require('assert');
var request = require('request');
var Glob = require('glob').Glob;
var cluster = require('cluster');
var xls2json = require('xls-to-json');
var Converter = require("csvtojson").Converter;
var nodemailer = require("nodemailer");
var json = require('json-update');
var uuid = require('node-uuid');

var securityUtils = require('./utils/SecurityUtils.js');
var configServcice = require('./service/configService.js');

//
var securityUtils = require('./utils/SecurityUtils.js');
var configServcice = require('./service/configService.js'); 

// run server
var server = app.listen(8012, function() {
	if (cluster.isMaster) {
		console.log('Master process ...');
	}
	if (cluster.isWorker) {
		console.log('Worker process ...');
	}

	var cpuCount = require('os').cpus().length;
	console.log('CPU nodes = ' + cpuCount);
	var host = server.address().address;
	var port = server.address().port;

	console.log("REST Service is running on http://%s:%s", host, port);
});

//
function supportCrossOriginScript(req, res, next) {
	res.status(200);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	// res.header("Access-Control-Allow-Headers", "Origin");
	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,
	// Content-Type, Accept");
	// res.header("Access-Control-Allow-Methods","POST, OPTIONS");
	res.header("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, DELETE, PUT, HEAD");
	// res.header("Access-Control-Max-Age","1728000");
	next();
}

app.post('/xls2json/', supportCrossOriginScript, function(req, res, next) {
	xls2json({
		input : "./data/ommonData/import/gdp.xls", // input xls
		output : "./data/ommonData/import/gdp.json", // output json
		sheet : "Data" // specific sheetname
	}, function(err, result) {
		if (err) {
			console.error(err);
		} else {
			console.log(result);
		}
	});

});

function errorHandler(err, req, res, next) {
	console.log(' handle error: ' + err);
	var code = err.code;
	var message = err.message;
	res.writeHead(code, message, {
		'content-type' : 'text/plain'
	});
	res.end(message);
}
