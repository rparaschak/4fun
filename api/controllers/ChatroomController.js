/**
 * ChatroomController
 *
 * @description :: Server-side logic for managing chatrooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var ChatRoom = require('../models/ChatRoom');

module.exports = {
	createChatRoom: function(req, res){
    if( !req.body.to )
      return res.status(400).send('To required.');
    ChatRoomService.createRoom(req.body.to)
      .then(function(room){
        res.status(201).json(room);
      })
      .catch(function(err){
        res.status(err.status).send(err.stack);
      });
  },

  getChatRoom: function(req, res){},

  // Get all rooms user participate in.
  getChatRooms: function(req, res){},

  getParticipants: function(req, res){},

  leaveChatRoom: function(req, res){},

  destroyChatRoom: function(req, res){},

  kickParticipant: function(req, res){},

  // We store light user object in every ChatRoom object and we need to update it once user got updated(name or anything).
  // This method updates light user in every ChatRoom
  invalidateLightUser: function(){},

  test: function(req, res){
    ChatRoomService.createRoom()
      .then(function(result){
        console.log(result);
        res.status(201).json(result);
      })
      .catch(function(err){
        console.log(err);
        res.status(err.status || 500).send(err);
      });
  }
};

