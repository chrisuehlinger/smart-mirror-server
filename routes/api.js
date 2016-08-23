var express = require('express');
var router = express.Router();

var clearScreen = require('./intents/clear');
var weather = require('./intents/weather');
var hackerNews = require('./intents/hacker-news');
var briefing = require('./intents/briefing');
var refresh = require('./intents/refresh');

router.all('/clear', function(req, res) {
    clearScreen(function(summary){
        res.send(summary);
    });
});

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

router.all('/refresh', function(req, res) {
    refresh(function(summary){
        res.send(summary);
    });
});

module.exports = router;