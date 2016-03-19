function writeMessage() {
    var messageContent = $('#messageContentInput').val();
    $.ajax({
        type: "POST",
        url: '/messages',
        data: { 
            messageContent: messageContent, 
            roomId: location.hash.replace('#', '')
        },
        success: function(message) {
            console.log('POST /message', message);
            $('#messageContentInput').val('');
            socket.emit('new message', message);
            return message;
        }
    });
}

socket.on('new message', function(message){
    console.log('on new message', message)
    var messagePartial = new EJS({url: 'partials/message.ejs'}).render({message: message});
    $('#messageList').append(messagePartial);
});
