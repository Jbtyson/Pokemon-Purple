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

    var retrieveMovesForPokemonInstance = function(pokemonInstanceId, callback) {
      var query = "CALL sp_retrievePokemonInstanceMoves(?)";
      params = [pokemonInstanceId];
      db.query(query, function(results) {
        moves = [];

        for(i = 0; i < results[0].length; i++) {
          var move = {
            name: results[0][i].name,
            accuracy: results[0][i].accuracy,
            power: results[0][i].power,
            pp: results[0][i].pp,
            maxPp: results[0][i].pp, //TODO: implement this
            type: results[0][i].type,
            moveId: results[0][i].move_id
          }
          moves.push(move);
        }
        callback(moves);
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

    var retrieveAllTypeRelations = function(callback) {
      var query = "CALL sp_retrieveAllTypeRelations()";
      db.query(query, function(results) {
        var relations = [];

        for(i = 0; i < 18; i++) {
          relations.push([]);
        }

        for(i = 0; i < results[0].length; i++) {
          var attackingTypeId = results[0][i].attacking_type_id;
          var defendingTypeId = results[0][i].defending_type_id;
          var modifier = results[0][i].modifier;
          relations[attackingTypeId][defendingTypeId] = modifier;
        }

        callback(relations);
      });
    }

    var retrieveAllBasePokemon = function(callback) {
      var query = "CALL sp_retrieveAllBasePokemon";
      db.query(query, function(results) {
        var basePokemon = [];
        for(i = 0; i < results[0].length; i++) {
          var pokemon = {
            pokemonId: results[0][i].pokemon_id,
            name: results[0][i].name
          }
          basePokemon.push(pokemon);
        }

        callback(basePokemon);
      });
    }

    return {
      db: db,
      retrievePokemonInstanceById: retrievePokemonInstanceById,
      retrievePokemonId: retrievePokemonById,
      retrieveAllWildPokemon: retrieveAllWildPokemon,
      retrieveAllTypeRelations: retrieveAllTypeRelations,
      retrieveMovesForPokemonInstance: retrieveMovesForPokemonInstance,
      retrieveAllBasePokemon: retrieveAllBasePokemon
    }
};
exports.PokemonDbao = PokemonDbao;
