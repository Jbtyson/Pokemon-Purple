// pokemonDbao.js
var PokemonInstance = require("./../../game/pokemonInstance.js").PokemonInstance;
var Pokemon = require("./../../game/pokemon.js").Pokemon;

var PokemonDbao = function(_db) {
    var db = _db

    var retrievePokemonInstanceById = function(pkmnInstId, callback) {
      var query = "CALL sp_retrievePokemonInstanceById(?);";
      var params = [pkmnInstId];
      db.query(query, function(results) {
        var pkmnInst = null;
        if(!!results) {
          pkmnInst = new PokemonInstance(
            {
              name: results[0][0].name,
              pokemonId: results[0][0].pokemon_id,
            },
            results[0][0].level,
            results[0][0].name,
            results[0][0].max_hp,
            results[0][0].cur_hp,
            results[0][0].attack,
            results[0][0].special_attack,
            results[0][0].defense,
            results[0][0].special_defense,
            results[0][0].speed,
            results[0][0].current_xp,
            results[0][0].xp_to_next_level,
            results[0][0].pokemon_instance_id
          );
        }

        callback(pkmnInst);
      }, params);


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
