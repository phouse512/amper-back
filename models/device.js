var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
	owner: String,
	deviceName: String,
	lastActive: Date,
	registerDate: { type: Date, default: Date.now },
});

var Device = mongoose.model('Device', deviceSchema);
module.exports = Device;