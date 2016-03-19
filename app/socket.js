module.exports = function(io) {

    return function(socket) {
        console.log('a user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
        socket.on('login', function(user){
            console.log('User', user, 'logged in');
        });
        socket.on('create room', function(room){
            io.emit('create room', room);
        });
    }
};
