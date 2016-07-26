var express = require('express');
var router = express.Router();

var weather = require('./intents/weather');
var hackerNews = require('./intents/hacker-news');

/* GET users listing. */
router.post('/', function(req, res) {
  var intent = req.body.request.intent;
  console.log(intent.name);
  if(intent.name === 'WeatherIntent') {
    weather(req, res);
  } else if(intent.name === 'HackerNewsIntent') {
    hackerNews.topStories(req, res);
  } else {
    res.json({
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": "Sure thing, " + (intent.name || 'No intent') + ' activated.'
        },
        "card": {
          "type": "Simple",
          "title": "HelloWorld",
          "content": "Welcome to the Alexa Skills Kit, you can say hello"
        },
        "shouldEndSession": true
      },
      "sessionAttributes": {}
    });
    res.end();
  }

  
});

module.exports = router;