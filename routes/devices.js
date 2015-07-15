var express = require('express');
var router = express.Router();
var device_handlers = require('../handlers/device');

// GET list of devices
router.get('/list', device_handlers.list);

// GET add device page
router.get('/add', device_handlers.getAdd);

// POST add device
router.post('/add', device_handlers.postAdd);

module.exports = router;