module.exports = {
  createMessage: function (req, res) {
    // 0) Validate body params
    // 1) Get ChatRoom and see if user can write a message(ChatRoomService.getChatRoomById)
    // 2) Create message
    // 3) Update ChatRoom last message

    if(!req.body.message)
      return res.status(400).send('req.body.message is required.');

    ChatRoomService.getChatRoomById(req.param('chatroomid'), req.user)
      .then(function (chatRoom) {
        if(!chatRoom)
          throw ExceptionsHelper.ChatRoom.NotFound;
        if(!ChatRoomService.checkIfUserIsParticipant(chatRoom, req.user.id))
          throw ExceptionsHelper.ChatRoom.NotParticipant;
        return MessageService.createMessage({
          user: req.user.id,
          message: req.body.message,
          chatRoomId: req.param('chatroomid')
        });
      })
      .then(function(){
        return MessageService.getLastMessage(req.param('chatroomid'));
      })
      .then(function(message){
        return ChatRoomService.updateLastMessage(req.param('chatroomid'), message);
      })
      .then(function(){
        res.status(201).send('ok');
      })
      .catch(ExceptionsHelper.shortCatch(res));
  },

  getMessages: function(req, res){

  }
};

