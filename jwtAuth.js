module.exports = function(req, res, next) {

  let token = req.headers.authorization || req.param('at');

  if(!token)
    return res.forbidden("Authorization header is required.");

  Tokens.verifyUser(token).then((payload) => {
    req.userId = payload.userid;
    next();
  }).catch((err) => {
    return res.forbidden("Wrong access token.", err);
  });
};
