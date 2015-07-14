var Device = require('../models/device');

exports.list = function(req, res){
	devices = Device.find().sort({'registerDate': 'desc'}).limit(100).exec(function(err, deviceList){
		res.render('device/list', { devices: deviceList });
	});
}