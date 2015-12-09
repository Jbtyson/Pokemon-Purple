// userDbao.js
var UserDbao = function(_db) {
    var db = _db

    var attemptUserLogin = function(username, password, callback) {
      var query = "CALL sp_attemptAuth(?, ?)";
      var params = [username, password];
      db.query(query, function(results) {
        var playerId;
        // we only need the first result
        console.log(results);
        if(!!results && !!results[0] && results[0][0]) {
          playerId = results[0][0].user_id;
        }
        // no results
        else {
          playerId = -1
        }
        console.log(">>>>>>>>>>>>>" + playerId);
        callback(playerId);
      }, params);
    }

    return {
      db: db,
      attemptUserLogin: attemptUserLogin
    }
};
exports.UserDbao = UserDbao;
