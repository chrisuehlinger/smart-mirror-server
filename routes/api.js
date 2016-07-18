var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
  console.log(req);
  res.json({
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "Sure thing"
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
});

module.exports = router;