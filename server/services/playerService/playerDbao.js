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
          console.log(results);
          party = [];
          for(i = 0; i < results.length; i++) {
            var pkmn = new PokemonInstance(
              null,
              results.max_hp,
              results.cur_hp,
              results.attack,
              results.special_attack,
              results.defense,
              results.special_defense,
              results.speed,
              results.pokemon_instance_id
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
