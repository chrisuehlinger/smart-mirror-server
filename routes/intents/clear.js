var socketing = require('../../sockets');

module.exports = function clearScreen(callback) {
    socketing.socket && socketing.socket.emit('clear-screen');
    callback('OK');
}