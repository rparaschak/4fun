/**
 * Created by rparaschak on 12/3/16.
 */

module.exports = {
  getUserById: function (userid) {

    const getUserByIdQuery = "SELECT * FROM users WHERE id = ?";
    return CassandraService.execute(getUserByIdQuery, [userid])
      .then(function(users){
        return users[0];
      });
  },

  createUser: function(user){
    const createUserQuery = "INSERT INTO users(id, name, fullname, profile_picture_url) " +
      "VALUES (?, ?, ?, ?);"; //+
      //"IF NOT EXISTS;";

    return CassandraService.execute(createUserQuery,
      [
        user.id,
        user.name,
        user.fullname,
        user.profilePictureUrl
      ]
      , true)
  }
}


/*CREATE TABLE messenger.users (
    id text PRIMARY KEY ,
    name text,
    fullname text,
    bio text,
    profile_picture_url text
);*/
