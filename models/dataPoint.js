var mongoose = require('mongoose');

var datapointSchema = mongoose.Schema({
	timestamp: Date,
	current: String,
	device: String,
	dataBag: mongoose.Schema.Types.Mixed
});

var DataPoint = mongoose.model('DataPoint', datapointSchema);
module.exports = DataPoint;