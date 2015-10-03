moment = require('moment');

exports.parseData = function(datapoint, baseTime, device, paramTypes) {
	try {
		result = datapoint.split(":");
		timestamp = moment.unix(parseInt(result[0])+parseInt(baseTime));
		current = result[1];
		params = result[2].split("-");
		console.log('paramTYpes: ' + paramTypes);
		paramsDict = {};

		for(var i=0; i < paramTypes.length; i++) {
			console.log(paramTypes[i]);
			paramsDict[paramTypes[i]] = params[i];
			console.log('paramsDict:');
			console.log(paramsDict);
		}
		return {
			timestamp: timestamp.toDate(),
			current: current,
			device: device,
			dataBag: paramsDict,
		};
	} catch(err){
		console.log(err);
		return;
	}
}