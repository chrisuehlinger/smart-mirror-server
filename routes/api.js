var express = require('express');
var router = express.Router();

var weather = require('./intents/weather');
var hackerNews = require('./intents/hacker-news');

/* GET users listing. */
router.all('/weather', weather);
router.all('/hacker-news-top', hackerNews.topStories);
router.all('/hacker-news-full', hackerNews.topStoriesWithComment);

module.exports = router;