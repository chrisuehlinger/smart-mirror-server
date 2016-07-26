var express = require('express');
var router = express.Router();

var weather = require('./intents/weather');
var hackerNews = require('./intents/hacker-news');

router.all('/weather', function(req, res) {
    weather(function(summary){
        res.send(summary);
    });
});

router.all('/hacker-news-top', function(req, res) {
    hackerNews.topStories(function(summary){
        res.send(summary);
    });
});

router.all('/hacker-news-full', function(req, res) {
    hackerNews.topStoriesWithComment(function(summary){
        res.send(summary);
    });
});

module.exports = router;