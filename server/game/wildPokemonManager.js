// wildPokemonManager.js
var PokemonInstance = require("./pokemonInstance.js").PokemonInstance;

var WildPokemonManager = function(_pokemonService) {
    var pokemonService = _pokemonService
    var pokemonInstances = {};

    var init = function() {
      //refreshPokemonInstances();
    }

    var refreshPokemonInstances = function() {
      console.log("Beginning wild pokemon refresh...");
      pokemonInstances = {};
      var pokemon = pokemonService.retrieveAllWildPokemon();
      for(i = 0; i < pokemon.length; i++) {
        pokemonInstances[pokemon[i].instanceId] = pokemon[i];
      }
      console.log("Wild pokemon refresh complete.");
    }

    var onTryCatchWildPokemon = function(playerId, pokemonInstanceId) {
      var response = {
        success: false
      };

      if(!pokemonInstances[pokemonInstanceId]) {
        console.log("Error, pokemon instance " + pokemonInstanceId + " could not be found.");
      }

      var rand = Math.random(100);
      if(rand <= pokemonInstances[pokemonInstanceId]) {
        pokemonCaught(playerId, pokemonInstanceId);
        response.success = true;
      }
      else {
        pokemonFailedToBeCaught(playerId, pokemonInstanceId);
        response.success = false;
      }

      return success;
    }

    var pokemonCaught = function(playerId, pokemonInstanceId) {
      // TODO: Make this atomic
      pokemonService.wildPokemonCaught(pokemonInstanceId);
      var pokemonInstance = pokemonInstances[pokemonInstanceId];
      playerManager.wildPokemonCaughtForPlayer(playerId, pokemonInstance);
    }

    var pokemonFailedToBeCaught = function(playerId, pokemonInstanceId) {

    }

    var onSearchForWildPokemon = function(playerId, geoLocation, callback) {
      callback({ message: "im going to go play ark now" });
    }

    return {
      pokemonInstances: pokemonInstances,
      init: init,
      refreshPokemonInstances: refreshPokemonInstances,
      onTryCatchWildPokemon: onTryCatchWildPokemon
    }
};
exports.WildPokemonManager = WildPokemonManager;
