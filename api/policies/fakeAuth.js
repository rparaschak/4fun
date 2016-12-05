module.exports = function (req, res, next) {
  req.userid = req.param('userid') || '1';
  UserService.getUserById(req.userid)
    .then(function (users) {
      req.user = users[0];
      next();
    })
    .catch(function(err){
      res.status(500).json(err);
    });

};
