var DataPoint = require('../models/dataPoint.js');

exports.list = function(req, res, next){
	datapoints = DataPoint.find(function(err, points){
		console.log(points.length);
		res.render("data_list", { points: points});
	});
}