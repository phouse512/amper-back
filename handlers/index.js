var parser = require('../util/parser.js'),
	DataPoint = require('../models/dataPoint.js'),
	global = require('../global.js');


exports.update = function(req, res, next){
	console.log(req.body);
	parsedResult = req.body.split(".");
	parsedTime = parsedResult[0].split(":");
	if(parsedTime.length == 1){
		baseTime = parsedResult[0];
		device = "default";
	} else {
		baseTime = parsedTime[0];
		device = parsedTime[1];
	}
	temp = [];
	datapoints = parsedResult[1].split(';');
	for(var i=0; i < datapoints.length; i++){
		temp.push(parser.parseData(datapoints[i], baseTime, device));
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

    	global.io.emit('data', arguments);

    	res.send((arguments.length+1) + " documents successfully stored.");
	});
}

exports.index = function(req, res, next) {
	res.render('index', { title: 'Amper' });
	global.io.emit('hello', 'world');
}

exports.graph = function(req, res, next){
	datapoints = DataPoint.find().sort({'timestamp': 'desc'}).limit(45).exec(function(err, points){
		console.log(points);
		res.render("graph", { pointsString: JSON.stringify(points) });
	});
}
