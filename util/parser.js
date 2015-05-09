moment = require('moment');

exports.parseData = function(datapoint, baseTime) {
	try {
		result = datapoint.split(":");
		timestamp = moment.unix(parseInt(result[0])+parseInt(baseTime));
		current = result[1];
		return {
			timestamp: timestamp.toDate(),
			current: current,
			device: 'default'
		};
	} catch(err){
		console.log(err);
		return;
	}
}