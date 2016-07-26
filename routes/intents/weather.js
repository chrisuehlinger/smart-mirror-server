var request = require('request');

module.exports = function weather(callback) {
  request('https://api.forecast.io/forecast/' + process.env.FORECAST_IO_API_KEY + '/39.2882,-76.6286', function(error, response, body){
    var summary;
    if(error) {
      console.error(error);
      summary = 'There was an error trying to retrieve the weather';
    } else {
      var forecast = JSON.parse(body);

      var summary = 'Right now it is ' + Math.round(forecast.currently.apparentTemperature) + ' and ' + forecast.currently.summary +
        '. Today, ' + forecast.daily.data[0].summary.slice(0,-1) + 
        ', with a high of ' + Math.round(forecast.daily.data[0].apparentTemperatureMax) + 
        ' and a low of ' + Math.round(forecast.daily.data[0].apparentTemperatureMin);
    }

    callback(summary);
  });
};