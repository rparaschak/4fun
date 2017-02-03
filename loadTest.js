/**
 * Created by rparaschak on 1/12/17.
 */

var request = require('request');
var Chance = require('chance');
var _ = require('underscore');
var B = require('./api/services/B');
const API = 'http://localhost:1337';
var usersCount = 50;
var chatsPerUser = 10;
var messagesToSend = 1000;


// Actual test case
var chance = new Chance();
var users = [];
var userChats = {};

createUsers(usersCount)
.then(function(createdUsers){
  createdUsers.forEach(function(user){
    user = JSON.parse(user);
    users.push(user);
  });

  // Creating chatrooms for each user
  return createChatRooms(users, chatsPerUser);
})
.then(function(chatrooms){

});

// Actual test case



function createUsers(count){
  var promises = [];
  for(let i = 0; i < count; i++){
    var id = chance.fbid();
    var name = chance.name();
    promises.push(createUser(id, name));
  }
  return Promise.all(promises);
};

function createChatRooms(userid, count, users){
  var chatRoomsPromises = [];
  users.forEach(function(user){
    for(let i = 0; i < count; i++){
      chatRoomsPromises.push(createChatRoom(userid, _.sample(users)));
    }
  });

  return Promise.all(chatRoomsPromises);
}

function createUser(id, name) {
  return new Promise(function (resolve, reject) {
    request.post(API + '/user',
      {
        form: {
          id: id,
          name: name
        }
      },
      function (err, httpRes, body) {
        err && reject(err);
        body && resolve(body);
      })
  });
}

function createChatRoom(userid, to) {
  return new Promise(function (resolve, reject) {
    request.post(API + '/chatroom',
      {
        form: {
          userid: userid,
          to: to
        }
      },
      function (err, httpRes, body) {
        err && reject(err);
        body && resolve(body);
      })
  });
}
