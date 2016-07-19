var api = require("hackernews-api");
var html2text = require("html-to-text");

module.exports = function hackerNews(req, res) {
  //TODO: Make all of this async, this could probably perform much better.

  var summary = 'Today\'s Top Hacker News Stories: ';
  api.getTopStories().slice(0,10).forEach(function(id, i){ 
    var story = api.getItem(id);
    summary += 'Number ' + (i+1) + ': ' + story.title + ' ';
    
    if(story.kids && story.kids.length) {
      var topComment = api.getItem(story.kids[0]);
      if(topComment && topComment.text) {
        var topCommentText = topComment.text;
        topCommentText = topCommentText.replace(/<i>&gt;/, '<i> Quote: ');
        topCommentText = topCommentText.slice(0,topCommentText.indexOf('<p>', topCommentText.indexOf('<p>')+1));
        topCommentText = html2text.fromString(topCommentText);
        topCommentText = topCommentText.replace(/\n/g, ' ');
        summary += 'Top Comment: ' + topCommentText + ' ';
      }
    }
  });
    
  res.json({
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "type": "SSML",
        "ssml": '<speak>' + summary + '</speak>' 
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
};