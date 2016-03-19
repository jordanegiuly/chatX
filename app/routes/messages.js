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
            authorLogin: req.user.login,
            authorAvatar: req.user.avatar,
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
        authorLogin: 'Tina',
        authorAvatar: '1.jpg',
        roomId: '1',
        content: "Hey there...",
        timestamp: "2016-03-19T18:03:31.351Z"
    },
    {
        id: '2',
        authorLogin: 'Tina',
        authorAvatar: '1.jpg',
        roomId: '1',
        content: "How are you?",
        timestamp: "2016-03-19T18:05:31.351Z"
    },
    {
        id: '3',
        authorLogin: 'Pamela',
        authorAvatar: '2.jpg',
        roomId: '1',
        content: "Not too bad...",
        timestamp: "2016-03-19T18:06:31.351Z"
    },
    {
        id: '4',
        authorLogin: 'Pamela',
        authorAvatar: '2.jpg',
        roomId: '2',
        content: "I'm all alone in here",
        timestamp: "2016-03-19T18:04:31.351Z"
    }
];
