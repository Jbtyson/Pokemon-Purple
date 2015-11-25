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

    return {
      playerDbao: playerDbao,
      retrievePlayerById: retrievePlayerById
    }
};
exports.PlayerService = PlayerService;
