module.exports = {

  handleCatch: handleCatch,
  shortCatch: shortCatch,

  Common: {
    NotAuthorized: {
      status: 403,
      message: "Not Authorized"
    },

    BadRequest: {
      status: 400,
      message: "Some parameters either wrong or missing."
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
  },

  User: {
    IdAlreadyExists: {
      status: 409,
      message: "User with the same id already exists in the database"
    }
  }
}

function handleCatch(res, exception){
  console.log(exception);
  res.status(exception.status || 500).send(exception.message || exception.stack);
}

function shortCatch(res){
  return function(err){
    handleCatch(res, err);
  }
}
