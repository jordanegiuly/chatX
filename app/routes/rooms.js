var Room = require('../models/room.js');
var _ = require('lodash');
var shortid = require('shortid');

module.exports = function(router) {
    router.get('/rooms', function(req, res) {
        var rooms = Room.index();
        console.log('GET /rooms', rooms);
        res.json(rooms);
    });

    router.get('/rooms/:id', function(req, res) {
        var room = Room.find('id', req.params.id);
        console.log('GET /rooms/' + req.params.id, room);
        res.json(room);
    });

    router.post('/rooms', function(req, res) {
        var newRoom = Room.create({
            roomName: req.body.roomName,
            adminId: req.user.login
        });
        console.log('POST /rooms', req.body, req.user, newRoom);
        res.status(201).json(newRoom);
    });

    router.post('/rooms/search', function(req, res) {
        var roomName = req.body.roomName;
        var existingRoom = Room.find('name', roomName);
        if (existingRoom) {
            console.log('ROOM FOUND !');
            console.log('POST /rooms/search', roomName, existingRoom);
            res.status(200).json(existingRoom);
        }
        else {
            var newRoom = Room.create({
                roomName: roomName,
                adminId: req.user.login
            });
            console.log('POST /rooms/search', roomName, newRoom);
            res.status(201).json(newRoom);
        }
    });

    return router;
}
