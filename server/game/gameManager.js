// gameManager.js
var GameManager = function() {
    var users = [];

    var addUser = function(user) {
      users.push(user);
    }

    var removeUser = function(user) {
      return -1;
    }

    return {
      users: users,
      addUser: addUser,
      removeUser: removeUser
    }
};
exports.GameManager = GameManager;
