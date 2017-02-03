/**
 * ChatroomController
 *
 * @description :: Server-side logic for managing chatrooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var ChatRoom = require('../models/ChatRoom');

module.exports = {
  createChatRoom: function (req, res) {
    if (!req.body.to)
      return res.status(400).send('To required.');
    ChatRoomService.createRoom(req.user, req.body, req.body.invitations)
      .then(function (roomId) {
        return ChatRoomService.getChatRoomById(roomId, req.user);
      })
      .then(function (chatRoom) {
        res.status(201).json(chatRoom);
      })
      .catch(ExceptionsHelper.shortCatch(res));
  },

  getChatRoom: function (req, res) {
    ChatRoomService.getChatRoomById(req.param('id'), req.user)
      .then(function(){})
      .catch(ExceptionsHelper.shortCatch(res));
  },

  // Get all rooms user participates in.
  getChatRooms: function (req, res) {
    ChatRoomService.getUserChatRooms(req.user)
      .then(function (chatRooms) {
        res.status(200).json(chatRooms);
      })
      .catch(ExceptionsHelper.shortCatch(res));
  },

  getParticipants: function (req, res) {
  },

  leaveChatRoom: function (req, res) {
    ChatRoomService.leaveChatRoom(req.param('chatroomid'), req.user)
    .then(function(result){
      res.status(200).send();
    })
    .catch(ExceptionHelper.shortCatch(res));
  },

  destroyChatRoom: function (req, res) {
  },

  kickParticipant: function (req, res) {
    if(!req.body.participantToKick)
      return res.status(400).send('req.body.participantToKick is required.');
    ChatRoomService.kickParticipant(req.param('chatroomid'), req.user, req.body)
      .then(function(result){
        res.status(200).send();
      })
      .catch(ExceptionHelper.shortCatch(res));
  },

  // We store light user object in every ChatRoom object and we need to update it once user got updated(name or anything).
  // This method updates light user in every ChatRoom
  invalidateLightUser: function () {
  },

  test: function (req, res) {
    console.log(req.body);
  }
};

