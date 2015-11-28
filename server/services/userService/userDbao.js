// userDbao.js
var UserDbao = function(_db) {
    var db = _db

    var attemptUserLogin = function(username, password) {
      var playerId;

      var query = "SELECT player_id FROM Users WHERE username=\'" + username + "\' AND password=\'" + password + "\'";
      var results = db.query(query);

      // we only need the first result
      if(!!results && !!results[0]) {
        playerId = results[0].playerId;
      }
      // no results
      else {
        playerId = -1
      }

      return playerId;
    }

    return {
      db: db,
      attemptUserLogin: attemptUserLogin
    }
};
exports.UserDbao = UserDbao;
