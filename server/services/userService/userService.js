// userService.js
var util = require("util");
var UserDbao = require("./userDbao").UserDbao;
var User = require("./../../game/user").User;

var UserService = function(db, _gameManager) {
    var userDbao = new UserDbao(db);
    var gameManager = _gameManager;

    var attemptUserLogin = function(username, password, callback) {
      userDbao.attemptUserLogin(username, password, function(playerId) {
        var response = {
          success: false,
          user: "NULL"
        }

        var user = new User(this, username, password)

        if(user.playerId != -1) {
          util.log(user.username + " logged in with id: " + user.playerId);
          gameManager.addUser(user);
          response.success = true;
          response.user = user;
        }

        callback(response);
      });
    }

    return {
      userDbao: userDbao,
      attemptUserLogin: attemptUserLogin
    }
};
exports.UserService = UserService;
