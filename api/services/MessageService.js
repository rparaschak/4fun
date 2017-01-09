module.exports = {

  createMessage: function(message){
    const createMessageQuery = "INSERT INTO messages(timeuuid, chat_room_id, from, message) " +
      "VALUES (timeuuid(), ?, ?, ?)"; //TODO: Investigate if it is possible to retrieve inserted document

    return CassandraService.execute(createMessageQuery,
      [
        message.chatRoomId, //room id
        message.form,
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
