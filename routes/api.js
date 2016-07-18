var express = require('express');
var router = express.Router();

var weather = require('./intents/weather');

/* GET users listing. */
router.post('/weather', weather);

module.exports = router;