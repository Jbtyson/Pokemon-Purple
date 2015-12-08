// pokemonDbao.js
var PokemonInstance = require("./../../game/pokemonInstance.js").PokemonInstance;
var Pokemon = require("./../../game/pokemon.js").Pokemon;

var PokemonDbao = function(_db) {
    var db = _db

    var retrievePokemonInstanceById = function(pkmnInstId, callback) {
      var query = "SELECT * FROM Pokemon_Instances WHERE pokemon_instance_id=" + pkmnInstId + ";";
      db.query(query, function(results) {
        var pkmnInst;
        if(!!results && !!results[0]) {
          // TODO: Actually pull the pokemon instace data down
          pkmnInst = new PokemonInstance();
        }
        else {
          pkmnInst = "NULL";
        }

        callback(pkmnInst);
      });


    }

    var retrievePokemonById = function(pkmnId, callback) {
      var query = "SELECT * FROM Pokemon WHERE pokemon_id=" + pkmnId + ";";
      db.query(query, function(results) {
        var pkmn;
        if(!!results && !!results[0]) {
          // TODO: Actually pull the pokemon instace data down
          pkmn = new Pokemon();
        }
        else {
          pkmn = "NULL";
        }

        callback(pkmn);
      });
    }

    var retrieveAllWildPokemon = function(callback) {
      var query = "CALL sp_retrieveAllWildPokemon()";
      db.query(query, function(results) {
        // TODO: Actually implements this
        var pkmn = [];
        callback(results);
      });
    }

    return {
      db: db,
      retrievePokemonInstanceById: retrievePokemonInstanceById,
      retrievePokemonId: retrievePokemonById,
      retrieveAllWildPokemon: retrieveAllWildPokemon
    }
};
exports.PokemonDbao = PokemonDbao;
