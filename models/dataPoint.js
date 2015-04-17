var mongoose = require('mongoose');

var datapointSchema = mongoose.Schema({
	timestamp: Date,
	current: String,
	device: String,
});

var DataPoint = mongoose.model('DataPoint', datapointSchema);
module.exports = DataPoint;