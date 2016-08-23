var request = require('request');
var socketing = require('../../sockets');

module.exports = function refresh(callback) {
  socketing.socket && socketing.socket.emit('refresh');
  callback('OK');
};