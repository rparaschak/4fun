module.exports = {

  createMessage: function(message){
    const createMessageQuery = "INSERT INTO messages(id, chat_room_id, user, message) " +
      "VALUES (now(), ?, ?, ?)"; //TODO: Investigate if it is possible to retrieve inserted document

    return CassandraService.execute(createMessageQuery,
      [
        message.chatRoomId, //room id
        message.user,
        message.message
      ]
      ,true)
  },

  getLastMessage: function(chatRoomId){
    const getLastMessageQuery = "SELECT * FROM messages WHERE chat_room_id = ? LIMIT 1";
    return CassandraService.execute(getLastMessageQuery, [chatRoomId], true)
      .then(function(messages){
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
