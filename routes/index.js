var express = require('express');
var router = express.Router();
var index_handlers = require('../handlers/index.js');

// GET home page.
router.get('/', index_handlers.index);

// POST update
router.post('/amper', index_handlers.update);

router.get('/graph', index_handlers.graph);

module.exports = router;
