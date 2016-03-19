var Message = require('../models/message.js');

module.exports = function(router) {

    // TODO limit to 10
    router.get('/messages', function(req, res) {
        var _messages = Message.filter('roomId', req.query.roomId)
        console.log('GET /messages', req.query, _messages);
        res.json(_messages);
    });

    router.post('/messages', function(req, res) {
        var user = req.user;
        var params = req.body;
        var newMessage = Message.create({
            content: params.messageContent,
            roomId: params.roomId,
            authorLogin: req.user.login,
            authorAvatar: req.user.avatar
        });
        console.log('POST /messages', params, user, newMessage);
        res.status(201).json(newMessage);
    });

    return router;
}
