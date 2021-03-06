var express = require('express');
var router = express.Router();
var data_handlers = require('../handlers/data.js');

/* GET users listing. */
router.get('/delete', data_handlers.deleteAll);
router.get('/allcsv', data_handlers.allCsv);
router.get('/:amount', data_handlers.list);
router.get('/', data_handlers.list);


// csv endpoint
//router.get('/csv', data_handlers.csv);

module.exports = router;
