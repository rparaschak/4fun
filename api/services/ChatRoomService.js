const crypto = require('crypto');

module.exports = {

  createRoom: function (user, to, participants = '') {
    const createChatRoomQuery = 'INSERT INTO chatrooms(id, last_message, last_read, messages_count, owner, participants) ' +
      'VALUES(?, ?, ?, 0, ?, ?) ;';

    participants = participants.split(',');
    participants.push(user.id);

    let roomId = generateRoomId();

    return CassandraService.execute(createChatRoomQuery,
      [
        roomId, //room id
        {message: 'last_message', user: 'bleablea'}, // last message
        {username: '3'}, // last read
        {username: 'rpa'}, //owner light user
        participants || [] // participants(invitations)
      ]
      , true)
      .then(function () {
        return roomId;
      });
  },

  getChatRoomById: function (roomId, user) {
    const getChatRoomByIdQuery = 'SELECT * FROM chatrooms WHERE id = ?';
    return CassandraService.execute(getChatRoomByIdQuery, [roomId], true)
      .then(function (chatRooms) {
        let chatRoom = chatRooms[0];
        if (!chatRooms)
          throw ExceptionsHelper.ChatRoom.NotFound;
        return chatRoom;
      });
  },

  checkIfUserIsParticipant: function (chatroom, userid) {
    return (chatroom.participants.indexOf(userid) > -1);
  },

  getUserChatRooms: function (user) {
    const getUserChatRoomsQuery = 'SELECT * FROM chatrooms WHERE ? IN participants'; //TODO
    return CassandraService.execute(getUserChatRoomsQuery, [user.id], true);
  },

  inviteIntoChatRoom: function (chatRoomId, user, userToInvite) {
    const addParticipantQuery = "UPDATE chatrooms SET participants = ? WHERE id = ?"; //TODO
    return this.getChatRoomById(chatRoomId, user)
      .then(function (chatRoom) {
        let participants = chatRoom.participants.push(userToInvite);
        CassandraService.execute(addParticipantQuery, [ //TODO: Handle error
          participants,
          chatRoomId
        ], true);
      })
  },

  kickParticipant: function (chatRoomId, user, participantToKick) {
    const removeParticipantQuery = "UPDATE chatrooms SET participants = ? WHERE id = ?"; //TODO
    return this.getChatRoomById(chatRoomId, user)
      .then(function (chatRoom) {
        if (user.id != chatRoom.owner.id)
          throw ExceptionHelper.ChatRoom.NotOwner;
        let participants = chatRoom.participants.splice(chatRoom.participants.indexOf(participantToKick), 1);
        CassandraService.execute(removeParticipantQuery, [ //TODO: Handle error
          participants,
          chatRoomId
        ], true);
      })
  },

  leaveChatRoom: function (chatRoomId, user) {
    const removeParticipantQuery = "UPDATE chatrooms SET participants = ? WHERE id = ?"; //TODO
    return this.getChatRoomById(chatRoomId, user)
      .then(function (chatRoom) {
        let participants = chatRoom.participants.splice(chatRoom.participants.indexOf(userToExpel), 1);
        CassandraService.execute(removeParticipantQuery, [ //TODO: Handle error
          participants,
          chatRoomId
        ], true);
      })
  },

  updateLastMessage: function (chatRoomId, message) { //Consider using triggers
    const updateLastMessageQuery = "UPDATE chatrooms SET last_message = ? WHERE id = ?";
    message.id = message.id.toString();
    console.log(message);
    return CassandraService.execute(updateLastMessageQuery, [ //TODO: Handle error
        message,
        'f94fc926e3ac1cbd7bc13d44810b84599c4e11ee'//chatRoomId
      ],
      true);
  }

};

function generateRoomId() {
  return crypto.randomBytes(20).toString('hex');
}

// ChatRoom table

/*CREATE TABLE messenger.chatrooms (
 id text PRIMARY KEY,
 last_message map<text, text>,
 last_read map<text, bigint>,
 messages_count bigint,
 owner map<text, text>,
 participants set<text>
 );

 CREATE INDEX ON messenger.chatrooms(participants);*/
