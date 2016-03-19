$( document ).ready(function() {
    $.get('/rooms', function(rooms) {
        console.log('GET /rooms', rooms);
        for(var i = 0; i < rooms.length; i++) {
            appendRoom(rooms[i]);
        }
    });
});

function getRoom(roomId) {
    $('#messageList').html('');
    $.get('/rooms/' + roomId, function(room) {
        console.log('GET /rooms/' + roomId, room);
        $('#messageListTitle').html('RECENT CHAT HISTORY FOR ROOM ' + room.name);
        $.get('/messages', { roomId: roomId }, function(messages) {
            console.log('GET /messages?roomId=' + roomId, messages);
            for(var i = 0; i < messages.length; i++) {
                var messagePartial = new EJS({url: 'partials/message.ejs'}).render({message: messages[i]});
                $('#messageList').append(messagePartial);
            }
        });
    });
};

function joinRoom() {
    var roomName = $('#roomNameInput').val();
    console.log('joinRoom', roomName);

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
