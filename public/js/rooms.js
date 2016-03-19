$( document ).ready(function() {
    console.log('Start getting rooms...');
    $.get('/rooms', function(rooms) {
        for(var i = 0; i < rooms.length; i++) {
            appendRoom(rooms[i]);
        }
    });
});

function getRoom(roomId) {
    $('#postList').html('');
    $.get('/rooms/' + roomId, function(room) {
        $('#postListTitle').html('RECENT CHAT HISTORY FOR ROOM ' + room.name);
        $.get('/posts', { roomId: roomId }, function(posts) {
            for(var i = 0; i < posts.length; i++) {
                var postPartial = new EJS({url: 'partials/post.ejs'}).render({post: posts[i]});
                $('#postList').append(postPartial);
            }
        });
    });
};

$('#joinRoomForm').submit(function(){
    var room = $(this).serializeArray()[0];
    socket.emit('create room', room.value);
    $('#roomNameInput').val('');
    return false;
});

socket.on('create room', function(room){
    appendRoom({name: room});
});

function appendRoom(room) {
    var roomPartial = new EJS({url: 'partials/room.ejs'}).render({room: room});
    $('#roomList').append(roomPartial);
}
