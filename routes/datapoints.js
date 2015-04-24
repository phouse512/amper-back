var express = require('express');
var router = express.Router();
var data_handlers = require('../handlers/data.js');

/* GET users listing. */
router.get('/', data_handlers.list);

module.exports = router;
