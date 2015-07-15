var DataPoint = require('../models/dataPoint.js'),
	Device = require('../models/device');

exports.list = function(req, res, next){
	if(!req.params.amount){
		req.params.amount = 200;
	} else if(req.params.amount == 'all') {
		req.params.amount = 0;
	}
	datapoints = DataPoint.find().sort({'timestamp': 'desc'}).limit(req.params.amount).exec(function(err, points){
		console.log(points.length);
		res.render("data_list", { points: points, pointsString: JSON.stringify(points) });
	});
}

exports.allCsv = function(req, res, next){
	DataPoint.find().lean().sort({ 'device': 'desc', 'timestamp': 'ascending'}).exec(function(err, points){
		res.csv(points);
	});
}
