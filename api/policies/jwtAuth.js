/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

// test token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTQ4MDk1NDgwMSwiZXhwIjoxNTY3MjY4NDAxfQ.RXHjG3dSds7S393V-HsXK_pAYOzdp1yVBUSn9Uo1PuM
module.exports = function(req, res, next) {

  var token = req.headers.authorization || req.param('at');

  if(!token)
    return res.forbidden("Authorization header is required.");

  Tokens.verifyUser(token).then((payload) => {
    req.userid = payload.userid;
    next();
  }).catch((err) => {
    return res.forbidden("Wrong access token.", err);
  });
};
