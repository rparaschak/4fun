/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  testAuth: function (req, res) {
    res.send(TokensService.generate(req.param('id')));
  },

  createUser: function (req, res) {
    var user = req.body;
    if (!user.id || !user.name)
      throw ExceptionsHelper.handleCatch(res, {message: ExceptionsHelper.Common.BadRequest});

    UserService.getUserById(user.id)
      .then(function (existingUser) {
        if(existingUser)
          throw ExceptionsHelper.User.IdAlreadyExists;
        return UserService.createUser(user)
      })
      .then(function () {
        return UserService.getUserById(user.id);
      })
      .then(function (user) {
        res.status(201).json(user);
      })
      .catch(ExceptionsHelper.shortCatch(res))

  },

  editUser: function (req, res) {
  }

};

