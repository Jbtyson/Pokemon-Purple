// userService.js
var UserDbao = require("./userDbao").UserDbao;

var UserService = function(db) {
    var userDbao = new UserDbao(db);

    var attemptUserLogin = function(username, password) {
      return -1;
    }

    return {
      userDbao: userDbao,
      attemptUserLogin: attemptUserLogin
    }
};
exports.UserService = UserService;
