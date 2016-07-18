var express = require('express');
var router = express.Router();

var weather = require('./intents/weather');
var hackerNews = require('./intents/hacker-news');

/* GET users listing. */
router.all('/weather', weather);
router.all('/hacker-news', hackerNews);

module.exports = router;