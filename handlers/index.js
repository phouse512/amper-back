var parser = require('../util/parser.js'),
	DataPoint = require('../models/dataPoint.js');


exports.update = function(req, res, next){
	datapoints = req.body.split(";");
	temp = [];
	for(var i=0; i < datapoints.length; i++){
		temp.push(parser.parseData(datapoints[i]));
	}

	console.log(temp);

	DataPoint.create(temp, function (err) {
    	if (err) { 
    		console.log(err);
    		res.send("Invalid data - not stored :(");
    	}

    	for (var i=1; i<arguments.length; ++i) {
    		console.log(arguments[i]);
        	// var candy = arguments[i];
    	}

    	res.send(arguments.length + " documents successfully stored.");
	});
}

exports.index = function(req, res, next) {
	res.render('index', { title: 'Express' });
}