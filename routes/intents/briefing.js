var weather = require('./weather');
var hackerNews = require('./hacker-news');

module.exports = function briefing(callback) {
    var summaryParts = ['',''],
        numCompleted = 0;
    weather(function(summary){
        summaryParts[0] = summary;
        finished();
    });
    
    hackerNews.topStories(function(summary){
        summaryParts[1] = summary;
        finished();
    });

    function finished(){
        numCompleted++;
        if(numCompleted === 2) {
            var summary = summaryParts.join(' ');
            callback(summary);
        }
    }
}