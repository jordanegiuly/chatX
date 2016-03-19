var _ = require('lodash');
var shortid = require('shortid');

function index() {
    return fakeData;
}

function find(key, value) {
    return _.find(fakeData, function(_rooom) {
        return _rooom[key] === value;
    });
}

function create(params) {
    var newRoom = {
        id: shortid.generate(),
        name: params.roomName,
        adminId: params.adminId
    }
    fakeData.push(newRoom);
    return newRoom;
}

var fakeData = [
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

module.exports = {
    find: find,
    create: create,
    index: index
}
