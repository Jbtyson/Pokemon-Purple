// userService.js
var UserDbao = require("./userDbao").UserDbao;

var UserService = function(db) {
    var userDbao = new UserDbao(db);

    var attemptUserLogin = function(data) {
      console.log(this);
      console.log(data);
    }

    return {
      userDbao: userDbao,
      attemptUserLogin: attemptUserLogin
    }
};
exports.UserService = UserService;
