var Device = require('../models/device');

exports.list = function(req, res){
	Device.find().sort({'registerDate': 'desc'}).limit(100).exec(function(err, deviceList){
		res.render('device/list', { devices: deviceList });
	});
}

exports.getAdd = function(req, res){
	res.render('device/add');
}

exports.postAdd = function(req, res){
	console.log(req.body.deviceName);
	console.log(req.body.ownerName);

	console.log(req.body);
	new Device({
		owner: req.body.ownerName,
		deviceName: req.body.deviceName
	}).save(function(err, newDevice){
		res.redirect('list');
	});
}