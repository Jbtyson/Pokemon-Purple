// userService.js
var util = require("util");
var UserDbao = require("./userDbao").UserDbao;
var User = require("./../../game/user").User;

var UserService = function(db, _gameManager) {
    var userDbao = new UserDbao(db);
    var gameManager = _gameManager;

    var attemptUserLogin = function(username, password, socket, callback) {
      userDbao.attemptUserLogin(username, password, function(playerId) {
        var response = {
          success: false,
          user: null
        }

        var user = new User(socket, username, password)

        if(playerId != -1) {
          util.log(user.username + " logged in with id: " + user.playerId);
          user.playerId = playerId
          gameManager.addUser(user);
          
          response.success = true;
          response.user = {
            username: user.name,
            playerId: user.playerId
          };
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
