var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
  res.json({
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "Welcome to the Alexa Skills Kit, you can say hello"
      },
      "card": {
        "type": "Simple",
        "title": "HelloWorld",
        "content": "Welcome to the Alexa Skills Kit, you can say hello"
      },
      "reprompt": {
        "outputSpeech": {
          "type": "PlainText",
          "text": "Welcome to the Alexa Skills Kit, you can say hello"
        }
      },
      "shouldEndSession": false
    },
    "sessionAttributes": {}
  });
  res.end();
});

module.exports = router;