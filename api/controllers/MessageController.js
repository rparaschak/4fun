module.exports = {
  createMessage: function (req, res) {
    // 0) Validate body params
    // 1) Get ChatRoom and see if user can write a message(ChatRoomService.getChatRoomById)
    // 2) Create message
    // 3) Update ChatRoom last message

    B.a('MessageController.createMessage');

    if(!req.body.message)
      return res.status(400).send('req.body.message is required.');

    var message;

    ChatRoomService.getChatRoomById(req.param('chatroomid'), req.user)
      .then(function (chatRoom) {
        if(!chatRoom)
          throw ExceptionsHelper.ChatRoom.NotFound;
        if(!ChatRoomService.checkIfUserIsParticipant(chatRoom, req.user.id))
          throw ExceptionsHelper.ChatRoom.NotParticipant;
        message = {
          user: req.user.id,
          message: req.body.message,
          chatRoomId: req.param('chatroomid'),
          createdAt: Date.now().toString()
        };
        return MessageService.createMessage(message);
      })
      .then(function(){
        return MessageService.getLastMessage(req.param('chatroomid'));
      })
      .then(function(message){
        return ChatRoomService.updateLastMessage(req.param('chatroomid'), message);
      })
      .then(function(){
        res.status(201).json(message);
        B.b('MessageController.createMessage');
      })
      .catch(ExceptionsHelper.shortCatch(res));
  },

  getMessages: function(req, res){

  }
};

