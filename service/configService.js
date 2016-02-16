//This file is user to populate reference collections like countries and languages, station list ...
var securityUtils = require('../utils/SecurityUtils.js'), 
assert = require('assert'), 
fs = require('fs'), 
async = require('async'), 
path = require('path');

var _this = this;

//module.exports.initRef = function(req, res, next, _db, countryName) {
//
//	var jsonUser = req.body;
//	var p = path.dirname(require.main.filename) + '\\data\\' + countryName
//			+ '\\';
//
//	fs.readdir(p, function(err, files) {
//		if (err) {
//			return res.status(500).json({"status" : -1,"msg" : err.message});
//		}
//		files.forEach(function(filename) {
//			fs.readFile(p + filename, 'utf-8', function(err, content) {
//				if (err) {
//					return res.status(500).json({
//						"status" : -1,
//						"msg" : err.message
//					});
//				}
//				// Async series
//				var d = JSON.parse(content);
//				var col = _db.collection('' + filename.split('.', 1));
//				async.series([
//				              //remove previous ref data
//				function(callback) {
//					col.deleteMany({}, function(err, object) {
//						if (err) {
//							return res.status(500).json({
//								"status" : -1,
//								"msg" : err.message
//							});
//						}
//						console.log(filename.split('.', 1) + " data removed");
//					});
//					callback();
//				},
//				function(callback) {
//					var batch = col.initializeOrderedBulkOp();
//
//					if (filename === 'station.geojson') {
//						for (i = 0; i < d.features.length; i++) {
//							var feature = d.features[i];
//							batch.insert(feature);
//						}
//					}
//
//					if (filename === 'commune.json') {
//						for (i = 0; i < d.length; i++) {
//							var feature = d[i];
//							batch.insert(feature);
//						}
//					}
//
//					// Execute the operations
//					batch.execute(function(err, result) {
//						if (err) {
//							return res.status(500).json({"status" : -1,"msg" : err.message});
//						}
//					});
//					console.log(filename.split('.', 1) + " data Loaded");
//					callback();
//				}
//
//				], function(err) { // This function gets called after the two
//					if (err) {
//						return res.status(500).json(err);
//					}
//
//				});
//				
//			});
//		});
//
//	});
//	return res.status(200).json({"status" : 1,"msg" : "Reference data updated"});
//}