var DataPoint = require('../models/dataPoint.js');

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