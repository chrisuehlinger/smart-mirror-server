var socketIO = require('socket.io');

module.exports = {
    init: function(server){
        this.socket = socketIO(server);
        this.socket.on('connection', function (socket) {
            console.log('socket connected');

            this.socket.on('disconnect', function () {
                console.log('socket disconnected');
            });

            this.socket.emit('text', 'wow. such event. very real time.');
        }.bind(this));
    }
};

