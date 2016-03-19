var _ = require('lodash');
var shortid = require('shortid');

module.exports = function(router) {

    // TODO limit to 10
    router.get('/messages', function(req, res) {
        var _messages = _.filter(messages, function(message) {
            return message.roomId === req.query.roomId;
        });
        console.log('GET /messages', req.query, _messages);
        res.json(_messages);
    });

    router.post('/messages', function(req, res) {
        var user = req.user;
        var params = req.body;
        var newMessage = {
            id: shortid.generate(),
            content: params.messageContent,
            roomId: params.roomId,
            authorId: req.user.login, // TODO
            timestamp: new Date()
        }
        messages.push(newMessage);
        console.log('POST /messages', params, user, newMessage);
        res.status(201).json(newMessage);
    });

    return router;
}

var messages = [
    {
        id: '1',
        authorId: '1',
        roomId: '1',
        content: "Hey there!",
        timestamp: ""
    },
    {
        id: '2',
        authorId: '1',
        roomId: '1',
        content: "Wassup?",
        timestamp: ""
    },
    {
        id: '3',
        authorId: '2',
        roomId: '1',
        content: "I'm here.",
        timestamp: ""
    },
    {
        id: '4',
        authorId: '2',
        roomId: '2',
        content: "I'm all alone",
        timestamp: ""
    }
];
