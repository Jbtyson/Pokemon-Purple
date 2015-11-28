// gameManager.js
var GameManager = function() {
    var users = [];

    var addUser = function(user) {
      users.push(user);
    }

    var removeUser = function(user) {
      return -1;
    }

    var startGame = function() {
      initTimers();
    }

    var initTimers = function() {
      // TODO: move this to the region manager
      var updateRegions = function() {
        console.log("Beginning region update...");
        regionManager.standardUpdate();
        console.log("Region update complete.");
      }
      var regionTimeoutId = setInterval(updateRegions, 1000);
    }

    return {
      users: users,
      addUser: addUser,
      removeUser: removeUser,
      startGame: startGame
    }
};
exports.GameManager = GameManager;
