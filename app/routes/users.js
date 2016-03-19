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

    router.put('/users', function(req, res) {
        var params = req.body;
        var user = User.update(req.user.login, params.currentRoomId);
        console.log('PUT /users', req.user.login, params, user);
        res.json(user);
    });

    return router;
}
