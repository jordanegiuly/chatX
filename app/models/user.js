var _ = require('lodash');
var shortid = require('shortid');

function find(login) {
    return _.find(fakeData, function(_user) {
        return _user.login === login;
    });
}

function filter(key, value) {
    return _.filter(fakeData, function(_user) {
        return _user[key] === value;
    });
}

function create(login) {
    var newUser = {
        id: shortid.generate(),
        login: login,
        avatar: '',
        currentRoomId: ''
    };
    fakeData.push(newUser);
    return newUser;
}

// TODO
function update(login, currentRoomId) {
    console.log(login, currentRoomId);
    var user;
    _.forEach(fakeData, function(_user) {
        console.log('update forEach', _user.login);
        if (_user.login === login) {
            console.log('FOUND user', _user);
            _user.currentRoomId = currentRoomId;
            user = _user;
            return;
        }
    });
    console.log('update no user found');
    return user;
}

function index() {
    return fakeData;
}

var fakeData = [
    {
        id: '1',
        login: 'first',
        avatar: '',
        currentRoomId: '1'
    },
    {
        id: '2',
        login: 'second',
        avatar: '',
        currentRoomId: '2'
    }
];

module.exports = {
    find: find,
    filter: filter,
    create: create,
    index: index,
    update: update
}
