// playerService.js
var PlayerDbao = require("./playerDbao.js").PlayerDbao;

var PlayerService = function(db) {
    var playerDbao = new PlayerDbao(db);

    // Retrieve the data for all of the pokemon instances in a party belonging to a playerid
    var retrievePartyByPlayerId = function(playerId, callback) {
      playerDbao.retrievePartyByPlayerId(playerId, function(party) {
        callback(party);
      });
    }

    // Adds a speceified pokemon instance id to a player's party
    var addPokemonToParty = function(playerId, pkmnInstId, callback) {
      playerDbao.addPokemonToParty(playerId, pkmnInstId, function(success) {
        callback(success);
      });
    }

    // Removes a specified pokemons instance id from a players party
    var removePokemonFromParty = function(playerId, pkmnInstId, callback) {
      playerDbao.removePokemonFromParty(playerId, pkmnInstId, function(success) {
        callback(success);
      });
    }

    var retrievePcByPlayerId = function(playerId, callback) {
      playerDbao.retrievePcByPlayerId(playerId, function(pokemon) {
        callback(pokemon);
      });
    }

    return {
      playerDbao: playerDbao,
      retrievePartyByPlayerId: retrievePartyByPlayerId,
      addPokemonToParty: addPokemonToParty,
      removePokemonFromParty: removePokemonFromParty,
      retrievePcByPlayerId: retrievePcByPlayerId
    }
};
exports.PlayerService = PlayerService;
