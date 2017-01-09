module.exports = {

  handleCatch: handleCatch,
  shortCatch: shortCatch,

  Common: {
    NotAuthorized: {
      status: 403,
      message: 'Not Authorized'
    }
  },

  ChatRoom: {
    NotParticipant: {
      status: 403,
      message: "Not a participant of particular ChatRoom."
    },
    NotFound: {
      status: 404,
      message: "ChatRoom not found."
    },
    NotOwner: {
      status: 403,
      message: "Not an owner."
    }
  }
}

function handleCatch(res, exception){
  res.status(exception.status || 500).send(exception.message || exception.stack);
}

function shortCatch(res){
  return function(err){
    handleCatch(res, err);
  }
}
