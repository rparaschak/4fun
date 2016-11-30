/**
 * ChatroomController
 *
 * @description :: Server-side logic for managing chatrooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createChatRoom: function(req, res){},

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
};

