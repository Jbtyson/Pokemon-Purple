// gameManager.js
var RegionManager = require("./regionManager.js").RegionManager;
var WildPokemonManager = require("./wildPokemonManager.js").WildPokemonManager;
var PlayerManager = require("./playerManager.js").PlayerManager;

var GameManager = function(regionService, pokemonService, playerService) {
    var users = [];
    var regionManager = new RegionManager(regionService);
    var wildPokemonManager = new WildPokemonManager(pokemonService);
    var playerManager = new PlayerManager(playerService);

    var addUser = function(user) {
      users.push(user);
      playerManager.newPlayerConnected(user.player);
    }

    var removeUser = function(user) {
      return -1;
    }

    var startGame = function() {
      regionManager.init();
      wildPokemonManager.init();
      playerManager.init();
    }

    return {
      regionManager: regionManager,
      wildPokemonManager: wildPokemonManager,
      playerManager: playerManager,
      users: users,
      addUser: addUser,
      removeUser: removeUser,
      startGame: startGame
    }
};
exports.GameManager = GameManager;
