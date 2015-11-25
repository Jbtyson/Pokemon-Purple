// pokemonService.js
var PokemonDbao = require("./pokemonDbao.js").PokemonDbao;

var PokemonService = function(db) {
    var pokemonDbao = new PokemonDbao(db);

    var retrievePokemonInstanceById = function(pkmnInstId) {
      return -1;
    }

    var retrievePokemonById = function(pkmnId) {
      return -1;
    }

    return {
      pokemonDbao: pokemonDbao,
      retrievePokemonInstanceById: retrievePokemonInstanceById,
      retrievePokemonById: retrievePokemonById
    }
};
exports.PokemonService = PokemonService;
