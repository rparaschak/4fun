const crypto = require('crypto');

module.exports = {

  createRoom: function (user, to, participants) {
    const createChatRoomQuery = 'INSERT INTO chatrooms(id, last_message, last_read, messages_count, owner, participants) ' +
      'VALUES(?, ?, ?, 0, ?, ?) ;';

    if (participants)
      participants = participants.split(',').push(user.id);

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
        if (!chatRoom.participants.indexOf(user.id))
          throw ExceptionHelper.ChatRoom.NotParticipant;
        if(!chatRooms)
          throw ExceptionHelper.ChatRoom.NotFound;
        return chatRoom;
      });
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
        if(user.id != chatRoom.owner.id)
          throw ExceptionHelper.ChatRoom.NotOwner;
        let participants = chatRoom.participants.splice(chatRoom.participants.indexOf(participantToKick), 1);
        CassandraService.execute(removeParticipantQuery, [ //TODO: Handle error
          participants,
          chatRoomId
        ], true);
      })
  },

  leaveChatRoom: function(chatRoomId, user){
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

  updateLastMessage: function(chatRoomId, message){ //Consider using triggers
    const updateLastMessageQuery = "UPDATE chatrooms SET last_message = ? WHERE id = ?";
    return CassandraService.execute(updateLastMessageQuery, [ //TODO: Handle error
      message,
      chatRoomId
    ], true);
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
 ) WITH bloom_filter_fp_chance = 0.01
 AND caching = {'keys': 'ALL', 'rows_per_partition': 'NONE'}
 AND comment = ''
 AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4'}
 AND compression = {'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor'}
 AND crc_check_chance = 1.0
 AND dclocal_read_repair_chance = 0.1
 AND default_time_to_live = 0
 AND gc_grace_seconds = 864000
 AND max_index_interval = 2048
 AND memtable_flush_period_in_ms = 0
 AND min_index_interval = 128
 AND read_repair_chance = 0.0
 AND speculative_retry = '99PERCENTILE';
 CREATE INDEX participants_index ON messenger.chatrooms (values(participants));*/
