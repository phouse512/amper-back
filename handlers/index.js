// var express = require('express');
// var router = express.Router();

exports.update = function(req, res, next){
	console.log(req.body.split(";"));
	res.send("its working");
}

exports.index = function(req, res, next) {
	res.render('index', { title: 'Express' });
}