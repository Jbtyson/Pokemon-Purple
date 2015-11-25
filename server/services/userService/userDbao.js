// userDbao.js
var UserDbao = function(_db) {
    var db = _db

    var attemptLogin = function(username, password) {
      var playerId;

      var query = "SELECT player_id FROM Users WHERE username=\'" + username + "\' AND password=\'" + password + "\'";
      var results = db.query(query);
      if(!!results[0]) {
        playerId = results[0].playerId;
      }
      else {
        // no results
        playerId = -1
      }

      return playerId;
    }

    return {
      db: db,
      attemptLogin: attemptLogin
    }
};
exports.UserDbao = UserDbao;
