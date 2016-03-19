var _ = require('lodash');
var shortid = require('shortid');

function filter(key, value) {
    return _.filter(fakeData, function(_message) {
        return _message[key] === value;
    });
}

function create(params) {
    var newMessage = {
        id: shortid.generate(),
        content: params.content,
        roomId: params.roomId,
        authorLogin: params.authorLogin,
        authorAvatar: params.authorAvatar,
        timestamp: new Date()
    }
    fakeData.push(newMessage);
    return newMessage;
}

var fakeData = [
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

module.exports = {
    filter: filter,
    create: create
}