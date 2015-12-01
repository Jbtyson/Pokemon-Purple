// gameManager.js
var RegionManager = require("./regionManager.js").RegionManager;

var GameManager = function() {
    var users = [];
    var regionManager;

    var addUser = function(user) {
      users.push(user);
    }

    var removeUser = function(user) {
      return -1;
    }

    var startGame = function(regionService) {
      regionManager = new RegionManager(regionService);
      regionManager.init();
    }

    return {
      users: users,
      addUser: addUser,
      removeUser: removeUser,
      startGame: startGame
    }
};
exports.GameManager = GameManager;
