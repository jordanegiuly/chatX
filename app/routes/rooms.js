var _ = require('lodash');
var shortid = require('shortid');

module.exports = function(router) {
    router.get('/rooms', function(req, res) {
        console.log('GET /rooms', rooms);
        res.json(rooms);
    });

    router.get('/rooms/:id', function(req, res) {
        var room = _.find(rooms, function(room) {
            return room.id === req.params.id;
        });
        console.log('GET /rooms/' + req.params.id, room);
        res.json(room);
    });

    router.post('/rooms', function(req, res) {
        var user = req.user;
        var params = req.body;
        var newRoom = {
            id: shortid.generate(),
            name: params.roomName,
            adminId: req.user.login // TODO
        }
        rooms.push(newRoom);
        console.log('POST /rooms', params, user, newRoom);
        res.status(201).json(newRoom);
    });

    router.post('/rooms/search', function(req, res) {
        var user = req.user;
        var roomName = req.body.roomName;

        var existingRoom = _.find(rooms, function(_room) {
            return _room.name === roomName;
        });

        if (existingRoom) {
            console.log('ROOM FOUND !');
            console.log('POST /rooms/search', roomName, existingRoom);
            res.status(200).json(existingRoom);
        }
        else {
            var newRoom = {
                id: shortid.generate(),
                name: roomName,
                adminId: req.user.login // TODO
            }
            rooms.push(newRoom);
            console.log('POST /rooms/search', roomName, newRoom);
            res.status(201).json(newRoom);
        }
    });

    return router;
}

var rooms = [
    {
        id: '1',
        name: "Bois de Boulogne",
        adminId: '1'
    },
    {
        id: '2',
        name: "Amsterdam",
        adminId: '2'
    }
];
