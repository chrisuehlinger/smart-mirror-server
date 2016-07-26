var express = require('express');
var router = express.Router();

var weather = require('./intents/weather');
var hackerNews = require('./intents/hacker-news');
var briefing = require('./intents/briefing')

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

router.all('/hacker-news-comment/:storynumber', function(req, res) {
    hackerNews.topComment(function(summary){
        res.send(summary);
    }, {
        'StoryNumber':{
            value: req.params.storynumber
        }
    });
});

router.all('/hacker-news-full', function(req, res) {
    hackerNews.topStoriesWithComment(function(summary){
        res.send(summary);
    });
});

router.all('/briefing', function(req, res) {
    briefing(function(summary){
        res.send(summary);
    });
});

module.exports = router;