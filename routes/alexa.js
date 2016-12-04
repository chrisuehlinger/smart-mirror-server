var express = require('express');
var router = express.Router();

var weather = require('./intents/weather');
var clearScreen = require('./intents/clear');
var hackerNews = require('./intents/hacker-news');
var briefing = require('./intents/briefing');
var refresh = require('./intents/refresh');
var pingChart = require('./intents/ping');

router.post('/', function(req, res) {

  var intent = req.body.request.intent,
      intentDictionary = {
        Clear: {
          outputSpeechType: 'PlainText',
          cardTitle: 'Clearing Mirror...',
          fn: clearScreen
        },
        Weather: {
          outputSpeechType: 'PlainText',
          cardTitle: 'Today\'s Weather',
          fn: weather
        },
        HackerNewsTopStories: {
          outputSpeechType: 'SSML',
          cardTitle: 'Today\'s Top Hacker News Stories',
          fn: hackerNews.topStories
        },
        HackerNewsTopComment: {
          outputSpeechType: 'SSML',
          cardTitle: 'Hacker News Comment',
          fn: hackerNews.topComment
        },
        Briefing: {
          outputSpeechType: 'SSML',
          cardTitle: 'Daily Briefing',
          fn: briefing
        },
        Refresh: {
          outputSpeechType: 'SSML',
          cardTitle: 'Refresh App',
          fn: refresh
        },
        Ping: {
          outputSpeechType: 'SSML',
          cardTitle: 'Display Ping Chart',
          fn: pingChart
        },
        NoIntent: {
          outputSpeechType: 'PlainText',
          cardTitle: intent.name || 'No Intent',
          fn: function(callback){
            callback('Intent "' + intent.name +'" not recognized');
          }
        }
      },
      intentKey = intentDictionary[intent.name] ? intent.name : 'NoIntent';

  intentDictionary[intentKey].fn(function(summary){
    res.json({
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": intentDictionary[intentKey].outputSpeechType,
          "text": summary,
          "ssml": '<speak>' + summary + '</speak>'
        },
        "card": {
          "type": "Simple",
          "title": intentDictionary[intentKey].cardTitle,
          "content": summary
        },
        "shouldEndSession": true
      },
      "sessionAttributes": {}
    });
  }, intent.slots);
});

module.exports = router;