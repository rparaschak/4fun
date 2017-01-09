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
        return MessageService.createMessage({
          from: req.user.id,
          message: req.body.message
        });
      })
      .then(function(){
        return MessagesService.getLastMessage(req.param('chatroomid'));
      })
      .then(function(message){
        ChatRoomService.updateLastMessage(req.param('chatroomid'), message);
      })
      .catch(ExceptionHelper.shortCatch(res));
  },

  getMessages: function(req, res){
    
  }
};

