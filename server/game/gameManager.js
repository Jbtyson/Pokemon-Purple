// gameManager.js
var RegionManager = require("./regionManager.js").RegionManager;
var WildPokemonManager = require("./wildPokemonManager.js").WildPokemonManager;
var PlayerManager = require("./playerManager.js").PlayerManager;

var GameManager = function() {
    var users = [];
    var regionManager,
        wildPokemonManager,
        playerManager;

    var addUser = function(user) {
      users.push(user);
    }

    var removeUser = function(user) {
      return -1;
    }

    var startGame = function(regionService, pokemonService, playerService) {
      regionManager = new RegionManager(regionService);
      regionManager.init();
      wildPokemonManager = new WildPokemonManager(pokemonService);
      wildPokemonManager.init();
      playerManager = new PlayerManager(playerService);
      playerManager.init();
    }

    return {
      users: users,
      addUser: addUser,
      removeUser: removeUser,
      startGame: startGame
    }
};
exports.GameManager = GameManager;
