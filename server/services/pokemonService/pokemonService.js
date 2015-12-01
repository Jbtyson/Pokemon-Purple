// pokemonService.js
var PokemonDbao = require("./pokemonDbao.js").PokemonDbao;

var PokemonService = function(db) {
    var pokemonDbao = new PokemonDbao(db);

    var retrievePokemonInstanceById = function(pkmnInstId) {
      var pkmnInst = pokemonDbao.retrievePokemonInstanceById(pkmnInstId);
      return pkmnInst;
    }

    var retrievePokemonById = function(pkmnId) {
      var pkmn = pokemonDbao.retrievePokemonById(pkmnId);
      return pkmn;
    }

    var retrieveAllWildPokemon = function() {
      var pkmn = pokemonDbao.retrieveAllWildPokemon();
      return pkmn;
    }

    return {
      pokemonDbao: pokemonDbao,
      retrievePokemonInstanceById: retrievePokemonInstanceById,
      retrievePokemonById: retrievePokemonById,
      retrieveAllWildPokemon: retrieveAllWildPokemon
    }
};
exports.PokemonService = PokemonService;
