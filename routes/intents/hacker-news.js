var request = require('request');

module.exports = function hackerNews(req, res) {
  // request('https://api.forecast.io/forecast/' + process.env.FORECAST_IO_API_KEY + '/39.2882,-76.6286', function(error, response, body){
    var summary = 'Welcome to Hacker News!';
    // if(error) {
    //   console.error(error);
    //   summary = 'There was an error trying to retrieve the weather';
    // }else {
      
    // }
    
    res.json({
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": summary 
        },
        "card": {
          "type": "Simple",
          "title": "HelloWorld",
          "content": summary
        },
          "shouldEndSession": true
      },
      "sessionAttributes": {}
      });
      res.end();
    // });
};