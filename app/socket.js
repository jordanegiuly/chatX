module.exports = function(io) {
    return function(socket) {
        console.log('SOCKET connection');
        socket.on('disconnect', function(){
            console.log('SOCKET disconnection');
        });
        socket.on('login', function(user){
            console.log('SOCKET login', user);
        });
        socket.on('create room', function(room){
            console.log('SOCKET create room', room);
            io.emit('create room', room);
        });
        socket.on('join room', function(params){
            console.log('SOCKET join room', params);
            io.emit('join room', params);
        });
        socket.on('leave room', function(params){
            console.log('SOCKET leave room', params);
            io.emit('leave room', params);
        });
        socket.on('new message', function(message){
            console.log('SOCKET new message', message);
            io.emit('new message', message);
        });
    }
};
