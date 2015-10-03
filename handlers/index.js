var parser = require('../util/parser.js'),
	DataPoint = require('../models/dataPoint.js'),
	global = require('../global.js');


// example:
// 1432863000:word:fun-tie-ah.0:1000:2-1000-9;3:31:1-900-9;14:500:20-300-70
// databag:
//     fun: 2,
//	   tie: 1000,
//	   ah: 9,
// value: 1000
// second: 0

exports.update = function(req, res, next){
	console.log(req.body);
	parsedResult = req.body.split(".");

	configuration = parsedResult[0];
	configArray = configuration.split(":");

	baseTime = configArray[0];
	device = configArray[1];
	paramTypes = configArray[2].split("-");

	console.log(paramTypes);



	// parsedTime = parsedResult[0].split(":");
	// if(parsedTime.length == 1){
	// 	baseTime = parsedResult[0];
	// 	device = "default";
	// } else {
	// 	baseTime = parsedTime[0];
	// 	device = parsedTime[1];
	// }
	temp = [];
	datapoints = parsedResult[1].split(';');
	for(var i=0; i < datapoints.length; i++){
		console.log('pre params state: ' + paramTypes);
		temp.push(parser.parseData(datapoints[i], baseTime, device, paramTypes));
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
