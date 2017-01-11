module.exports = function (req, res, next) {

  var fakeUser = { //TODO: FAKE
    id: '1',
    fullname: 'Test User',
    name: 'testuser'
  };

  req.userid = req.param('userid') || fakeUser.id;
  UserService.getUserById(req.userid)
    .then(function (users) {
      req.user = users[0] || fakeUser;
      next();
    })
    .catch(function(err){
      console.log(err);
      res.status(500).json(err);
    });

};
