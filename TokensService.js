/**
 * Created by rparaschak on 4/14/16.
 */

var jwt = require('jsonwebtoken');

var KEY = "ThisIsSpartaOlolo1488";
var ALG = "HS256";
var EXPIRES = "2 days";

module.exports = {

  generate: function(userid){
    return jwt.sign({ userid: userid }, KEY, { algorithm: ALG, expiresIn: EXPIRES });
  },

  verifyUser: function(token){
    return new Promise(function(resolve, reject){
      if(!token)
        resolve({status: 403, message: "Authorization header is required."});
      jwt.verify(token, KEY, {algorithm: ALG}, function(err, decoded){
        if(err)
          return reject({status: 403, error: err});
        resolve(decoded);
      });
    });

  }
};
