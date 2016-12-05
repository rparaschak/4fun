/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	testAuth: function(req, res){
    res.send(TokensService.generate(1));
  }
};

