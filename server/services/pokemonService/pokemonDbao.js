// pokemonDbao.js
var PokemonInstance = require("./../../game/pokemonInstance.js").PokemonInstance;
var Pokemon = require("./../../game/pokemon.js").Pokemon;

var PokemonDbao = function(_db) {
    var db = _db

    var retrievePokemonInstanceById = function(pkmnInstId) {
      var query = "SELECT * FROM Pokemon_Instances WHERE pokemon_instance_id=" + pkmnInstId + ";";
      var results = db.query(query);

      var pkmnInst;
      if(!!results && !!results[0]) {
        // TODO: Actually pull the pokemon instace data down
        pkmnInst = new PokemonInstance();
      }
      else {
        pkmnInst = "NULL";
      }

      return pkmnInst;
    }

    var retrievePokemonById = function(pkmnId) {
      var query = "SELECT * FROM Pokemon WHERE pokemon_id=" + pkmnId + ";";
      var results = db.query(query);

      var pkmn;
      if(!!results && !!results[0]) {
        // TODO: Actually pull the pokemon instace data down
        pkmn = new Pokemon();
      }
      else {
        pkmn = "NULL";
      }

      return pkmn;
    }

    return {
      db: db,
      retrievePokemonInstanceById: retrievePokemonInstanceById,
      retrievePokemonId: retrievePokemonById
    }
};
exports.PokemonDbao = PokemonDbao;
