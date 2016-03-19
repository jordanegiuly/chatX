var currentRoom;

$( document ).ready(function() {
    $.get('/rooms', function(rooms) {
        console.log('GET /rooms', rooms);
        for(var i = 0; i < rooms.length; i++) {
            appendRoom(rooms[i]);
        }
    });
});

$("#roomNameInput").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        joinRoom();
    }
});

function getRoom(roomId) {
    $('#messageList').html('');
    $('#userList').html('');

    $.get('/rooms/' + roomId, function(room) {
        currentRoom = room;
        console.log('currentUser.currentRoomId', currentUser.currentRoomId);
        if (currentUser.currentRoomId) {
            socket.emit('leave room', {roomId: currentUser.currentRoomId, user: currentUser});
        }
        socket.emit('join room', {roomId: roomId, user: currentUser});

        console.log('GET /rooms/' + roomId, room);
        $('#messageListTitle').html('RECENT CHAT HISTORY FOR ROOM ' + room.name);
        $.get('/messages', { roomId: roomId }, function(messages) {
            console.log('GET /messages?roomId=' + roomId, messages);
            for(var i = 0; i < messages.length; i++) {
                var messagePartial = new EJS({url: 'partials/message.ejs'}).render({message: messages[i]});
                $('#messageList').append(messagePartial);
            }
        });

        $.ajax({
            url: '/users',
            method: 'PUT',
            data: {currentRoomId: room.id},
            success(updatedUser) {
                console.log('PUT /users', {currentRoomId: room.id}, updatedUser);
                currentUser = updatedUser;
                $.get('/users', { roomId: roomId }, function(users) {
                    console.log('GET /users?roomId=' + roomId, users);
                    for(var i = 0; i < users.length; i++) {
                        var userPartial = new EJS({url: 'partials/user.ejs'}).render({user: users[i]});
                        $('#userList').append(userPartial);
                    }
                });
                return updatedUser;
            }
        });
    });
};

function joinRoom() {
    if (!$('#roomNameInput').val()) {
        return;
    }
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
    console.log('SOCKET create room', room)
    appendRoom(room);
});

socket.on('join room', function(params){
    var roomId = params.roomId;
    var user = params.user;
    
    if (currentRoom.id === roomId && user.login != currentUser.login) {
        console.log('SOCKET join room', roomId, user);
        var userPartial = new EJS({url: 'partials/user.ejs'}).render({user: user});
        $('#userList').append(userPartial);
    }
});

socket.on('leave room', function(params){
    var roomId = params.roomId;
    var user = params.user;
    if (currentRoom.id === roomId) {
        console.log('SOCKET leave room', roomId, user);
        $('#user-' + user.id).remove();
    };
});

function appendRoom(room) {
    var roomPartial = new EJS({url: 'partials/room.ejs'}).render({room: room});
    $('#roomList').append(roomPartial);
}
