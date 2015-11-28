// playerService.js
var PlayerDbao = require("./playerDbao.js").PlayerDbao;

var PlayerService = function(db) {
    var playerDbao = new PlayerDbao(db);

    var retrievePlayerById = function(playerId) {
      var response = {
        members: []
      };

      return response;
    }

    // Retrieve the data for all of the pokemon instances in a party belonging to a playerid
    var retrievePartyByPlayerId = function(playerId) {
      var party = playerDbao.retrieveParty(playerId);
    }

    return {
      playerDbao: playerDbao,
      retrievePlayerById: retrievePlayerById
    }
};
exports.PlayerService = PlayerService;
