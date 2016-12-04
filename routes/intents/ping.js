var socketing = require('../../sockets');

module.exports = function displayPingChart(callback) {
    socketing.socket && socketing.socket.emit('ping-chart');
    callback('OK');
}