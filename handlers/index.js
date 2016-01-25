var parser = require('../util/parser.js'),
	DataPoint = require('../models/dataPoint.js'),
	global = require('../global.js'),
	pg = require('pg'),
	credentials = require('../credentials.js');

// 1432863000:word:fun-tie-ah.0:1000:2-1000-9;3:31:1-900-9;14:500:20-300-70

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
		if (datapoints[i] != "") {
			temp.push(parser.parseData(datapoints[i], baseTime, device));
		}
	}

	console.log(temp);

	// psql code to insert 
	var client = new pg.Client(credentials.psqlConnString);
	client.connect(function(err) {
		if(err) {
			// return console.error('could not connect to postgres', err);
			res.send(err);
		}

		var thisQueryDoe = buildQuery(temp);
		console.log(thisQueryDoe)
		client.query(thisQueryDoe, function(err, result) {
			if(err) {
				// return console.error('error running query', err);
				res.send(err);
				return console.error('error', err);
			}

			client.end();
			res.send(result.rowCount + " records successfully added!");
		});
	});

	// DataPoint.create(temp, function (err) {
 //    	if (err) { 
 //    		console.log(err);
 //    		res.send("Invalid data - not stored :(");
 //    	}

 //    	for (var i=1; i<arguments.length; ++i) {
 //    		console.log(arguments[i]);
 //        	// var candy = arguments[i];
 //    	}

 //    	global.io.emit('data', arguments);

 //    	res.send((arguments.length+1) + " documents successfully stored.");
	// });
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

function buildQuery(datapointArray) {
	var query = "insert into footprint_footprint (timestamp, current, monitor_id) values";

	for (var i=0; i < datapointArray.length; i++) {
		var tempQuery = " (to_timestamp(" + datapointArray[i].timestamp + ")," + datapointArray[i].current + "," + datapointArray[i].device + ")";

		query = query + tempQuery;
		if (i != datapointArray.length-1) {
			query = query + ",";
		}
	}

	return query;
}
