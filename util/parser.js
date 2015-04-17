moment = require('moment');

exports.parseData = function(datapoint) {
	try {
		result = datapoint.split(":");
		timestamp = moment.unix(parseInt(result[0]));
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