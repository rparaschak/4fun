module.exports = {

  createMessage: function (message) {
    const createMessageQuery = "INSERT INTO messages(id, chat_room_id, user, message) " +
      "VALUES (now(), ?, ?, ?)"; //TODO: Investigate if it is possible to retrieve inserted document
    B.a('createMessage');
    return CassandraService.execute(createMessageQuery,
      [
        message.chatRoomId, //room id
        message.user,
        message.message
      ]
      , true)
      .then(function(res){
        B.b('createMessage');
        return res;
      })
  },

  getLastMessage: function (chatRoomId) {
    const getLastMessageQuery = "SELECT * FROM messages WHERE chat_room_id = ? LIMIT 1";
    B.a('getLastMessage');
    return CassandraService.execute(getLastMessageQuery, [chatRoomId], true)
      .then(function (messages) {
        B.b('getLastMessage');
        return messages[0];
      });
  }

};

/*

 CREATE TABLE messenger.messages (
 chat_room_id timeuuid,
 id timeuuid,
 message text,
 user text,
 PRIMARY KEY (chat_room_id, id));

 */
