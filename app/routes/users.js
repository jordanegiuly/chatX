var _ = require('lodash');
var shortid = require('shortid');

module.exports = function(router) {

    router.get('/users', function(req, res) {
        var _users = _.filter(users, function(message) {
            return user.currentRoomId === req.query.roomId;
        });
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
        var user = req.user;
        var params = req.body;
        findUser = _.find(user, function(_user) {
            return _user.login === user.login;
        });
        res.json(findUser);
    });

    return router;
}

var users = [
    {
        id: '1',
        login: 'first',
        avatar: '',
        currentRoomId: ''
    },
    {
        id: '2',
        login: 'second',
        avatar: '',
        currentRoomId: ''
    }
];
