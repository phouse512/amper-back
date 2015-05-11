var DataPoint = require('../models/dataPoint.js');

exports.list = function(req, res, next){
	datapoints = DataPoint.find().sort({'timestamp': 'desc'}).limit(100).exec(function(err, points){
		console.log(points.length);
		res.render("data_list", { points: points, pointsString: JSON.stringify(points) });
	});
}