/**
 * Created by rparaschak on 12/3/16.
 */

module.exports = {
  getUserById: function (userid) {

    const getUserByIdQuery = "SELECT * FROM users WHERE userid = ?";
    return CassandraService.execute(getUserByIdQuery, [userid])
      .catch(function(err){
        console.log(err);
      });
  },

  createUser: function(){
    const createUserQuery = "INSERT INTO users(userid, username, password, profile_picture_url) " +
      "VALUES (?, ?, ?, ?);"
  }
}
