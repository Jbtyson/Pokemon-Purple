// playerDbao.js
var PokemonInstance = require("../../game/pokemonInstance.js").PokemonInstance

var PlayerDbao = function(_db) {
    var db = _db

    // Retrieve the data for all of the pokemon instances in a party belonging to a playerid
    var retrievePartyByPlayerId = function(playerId, callback) {
      var query = "CALL sp_retrievePokemonInstancesInParty(?);";
      var params = [playerId];
      db.query(query, function(results) {
        var party;
        if(results.length > 0) {
          party = [];
          for(i = 0; i < results[0].length; i++) {
            var pkmn = new PokemonInstance(
              {
                name: results[0][i].name,
                pokemonId: results[0][i].pokemon_id,
              },
              results[0][i].level,
              results[0][i].name,
              results[0][i].max_hp,
              results[0][i].cur_hp,
              results[0][i].attack,
              results[0][i].special_attack,
              results[0][i].defense,
              results[0][i].special_defense,
              results[0][i].speed,
              results[0][i].current_xp,
              results[0][i].xp_to_next_level,
              results[0][i].pokemon_instance_id
            );
            party.push(pkmn);
          }
        }
        // no results
        else {
          party = "NULL";
        }

        callback(party);
      }, params);
    }

    // Adds a speceified pokemon instance id to a player's party
    var addPokemonToParty = function(playerId, pkmnInstId, callback) {
      var query = "INSERT INTO Parties (player_id, pokemon_instance_id) VALUES (" + playerId + ", " + pkmnInstId + ");"
      db.query(query, function(results) {
        callback(!!results.affectedRows);
      });

    }

    // Removes a specified pokemons instance id from a players party
    var removePokemonFromParty = function(playerId, pkmnInstId) {
      var query = "DELETE FROM Parties WHERE playerId=" + playerId + " AND pokemon_instance_id=" + pkmnInstId;
      db.query(query, function() {
        callback(!!results.affectedRows);
      });
    }

    return {
      db: db,
      retrievePartyByPlayerId: retrievePartyByPlayerId,
      addPokemonToParty: addPokemonToParty,
      removePokemonFromParty: removePokemonFromParty
    }
};
exports.PlayerDbao = PlayerDbao;
