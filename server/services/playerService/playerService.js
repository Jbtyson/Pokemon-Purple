// playerService.js
var PlayerDbao = require("./playerDbao.js").PlayerDbao;

var PlayerService = function(db) {
    var playerDbao = new PlayerDbao(db);

    // Retrieve the data for all of the pokemon instances in a party belonging to a playerid
    var retrievePartyByPlayerId = function(playerId) {
      var party = playerDbao.retrieveParty(playerId);
      return party;
    }

    // Adds a speceified pokemon instance id to a player's party
    var addPokemonToParty = function(playerId, pkmnInstId) {
      var success = playerDbao.addPokemonToParty(playerId, pkmnInstId);
      return success;
    }

    // Removes a specified pokemons instance id from a players party
    var removePokemonFromParty = function(playerId, pkmnInstId) {
      var success = playerDbao.removePokemonFromParty(playerId, pkmnInstId);
      return success;
    }

    return {
      playerDbao: playerDbao,
      retrievePartyByPlayerId: retrievePartyByPlayerId,
      addPokemonToParty: addPokemonToParty,
      removePokemonFromParty: removePokemonFromParty
    }
};
exports.PlayerService = PlayerService;
