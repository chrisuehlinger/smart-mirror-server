
module.exports = function weather(req, res) {
    res.json({
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": "Sure thing, here\'s the weather.'
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
};