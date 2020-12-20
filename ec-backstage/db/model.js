let url = __basename + '/db/tab';

let user = require(url + '/user.js');

let diarybook = require(url + '/diarybook.js');

let userLabel = require(url + '/userLabel.js');

let diary = require(url + '/diary.js');


module.exports = {
    user,
    diarybook,
    userLabel,
    diary
}