var _ = require('lodash');
var shortid = require('shortid');
var User = require('../models/user.js');

module.exports = function(router) {

    router.get('/users', function(req, res) {
        var _users = [];
        if (req.query.roomId) {
            _users = User.filter('currentRoomId', req.query.roomId);
        } else {
            _users = User.index();
        }
        console.log('GET /users', req.query, _users);
        res.json(_users);
    });

    // router.post('/users', function(req, res) {
    //     var user = req.user;
    //     var params = req.body;
    //     var newMessage = {
    //         id: shortid.generate(),
    //         content: params.messageContent,
    //         roomId: params.roomId,
    //         authorId: req.user.login, // TODO
    //         timestamp: new Date()
    //     }
    //     users.push(newMessage);
    //     console.log('POST /users', params, user, newMessage);
    //     res.status(201).json(newMessage);
    // });

    router.put('/users', function(req, res) {
        var params = req.body;
        var user = User.update(req.user.login, params.currentRoomId);
        console.log('PUT /users', req.user.login, params, user);
        res.json(user);
    });

    return router;
}
