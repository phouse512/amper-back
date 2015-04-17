var express = require('express');
var router = express.Router();
var index_handlers = require('../handlers/index.js');

// GET home page.
router.get('/', index_handlers.index);

// POST update
router.post('/amper', index_handlers.update);

module.exports = router;
