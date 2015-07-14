var express = require('express');
var router = express.Router();
var device_handlers = require('../handlers/device');

// GET list of devices
router.get('/list', device_handlers.list);