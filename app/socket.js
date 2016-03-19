module.exports = function(io) {

    return function(socket) {
        console.log('a user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
        socket.on('login', function(user){
            console.log('User', user.login, 'logged in');
        });
        socket.on('create room', function(room){
            io.emit('create room', room);
        });
        socket.on('join room', function(params){
            io.emit('join room', params);
        });
        socket.on('leave room', function(params){
            io.emit('leave room', params);
        });
        socket.on('new message', function(message){
            io.emit('new message', message);
        });
    }
};
