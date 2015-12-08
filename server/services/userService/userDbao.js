// userDbao.js
var UserDbao = function(_db) {
    var db = _db

    var attemptUserLogin = function(username, password, callback) {
      var playerId;

      var query = "SELECT user_id FROM Users WHERE username=\'" + username + "\' AND password=\'" + password + "\'";
      db.query(query, function(results) {
        // we only need the first result
        if(!!results && !!results[0]) {
          playerId = results[0].user_id;
        }
        // no results
        else {
          playerId = -1
        }

        callback(playerId);
      });
    }

    return {
      db: db,
      attemptUserLogin: attemptUserLogin
    }
};
exports.UserDbao = UserDbao;
