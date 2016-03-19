$( document ).ready(function() {
    $.get('/rooms', function(rooms) {
        console.log('GET /rooms', rooms);
        for(var i = 0; i < rooms.length; i++) {
            appendRoom(rooms[i]);
        }
    });
});

function getRoom(roomId) {
    $('#postList').html('');
    $.get('/rooms/' + roomId, function(room) {
        console.log('GET /rooms/' + roomId, room);
        $('#postListTitle').html('RECENT CHAT HISTORY FOR ROOM ' + room.name);
        $.get('/posts', { roomId: roomId }, function(posts) {
            console.log('GET /posts?roomId=' + roomId, posts);
            for(var i = 0; i < posts.length; i++) {
                var postPartial = new EJS({url: 'partials/post.ejs'}).render({post: posts[i]});
                $('#postList').append(postPartial);
            }
        });
    });
};

function postRoom() {
    var roomName = $('#roomNameInput').val();
    console.log('postRoom', roomName);

    $.ajax({
        type: "POST",
        url: '/rooms/search',
      data: { roomName: roomName },
      success: function(room, textStatus, xhr) {
        console.log('POST /room', room, xhr.status);
        getRoom(room.id);
        $('#roomNameInput').val('');
        if (xhr.status === 201) {
            socket.emit('create room', room);
        }
        location.hash = room.id;
        return room;
      }
    });
}

socket.on('create room', function(room){
    console.log('on create room', room)
    appendRoom(room);
});

function appendRoom(room) {
    var roomPartial = new EJS({url: 'partials/room.ejs'}).render({room: room});
    $('#roomList').append(roomPartial);
}
