// userService.js
var util = require("util");
var UserDbao = require("./userDbao").UserDbao;
var User = require("./../../game/user").User;

var UserService = function(db) {
    var userDbao = new UserDbao(db);

    var attemptUserLogin = function(username, password, socket, callback) {
      userDbao.attemptUserLogin(username, password, function(playerId) {
        var response = {
          success: false,
          user: null
        };

        var user = new User(socket, username, password)

        if(playerId != -1) {
          util.log(user.username + " logged in with id: " + user.playerId);
          user.playerId = playerId

          response.success = true;
          var clientUser = {
            username: username,
            playerId: playerId
          };
          response.user = clientUser;
        }

        global.gameManager.addUser(user);
        callback(response);
      });
    }

    return {
      userDbao: userDbao,
      attemptUserLogin: attemptUserLogin
    }
};
exports.UserService = UserService;
