// playerDbao.js
var PlayerDbao = function(_db) {
    var db = _db

    // Retrieve the data for all of the pokemon instances in a party belonging to a playerid
    var retrievePartyByPlayerId = function(playerId) {
      var query = "SELECT * FROM Pokemon_Instances JOIN Parties ON Pokemon_Instances.pokemon_instance_id = Parties.pokemon_instance_id WHERE Parties.player_id=" + playerId;
      var results = db.query(query);

      var party;
      if(results.length > 0) {
        party = new Party();
        for(i = 0; i < rows.length; i++) {
          // TODO: Pull the actual data out of the rows for this
          var pkmn = new PokemonInstance();
          party.addPokemon(pkmn);
        }
      }
      // no results
      else {
        party = "NULL";
      }

      return party;
    }

    // Adds a speceified pokemon instance id to a player's party
    var addPokemonToParty = function(playerId, pkmnInstId) {
      var query = "INSERT INTO Parties (player_id, pokemon_instance_id) VALUES (" + playerId ", " + pkmnInstId + ");"
      var results = db.query(query);

      if(!!results) {
        return true;
      }
      else {
        return false;
      }
    }

    // Removes a specified pokemons instance id from a players party
    var removePokemonFromParty = function(playerId, pkmnInstId) {
      var query = "DELETE FROM Parties WHERE playerId=" + playerId + " AND pokemon_instance_id=" pkmnInstId;
      var results = db.query(query);
      if(!!results) {
        return true;
      }
      else {
        return false;
      }
    }

    return {
      db: db,
      retrievePartyByPlayerId: retrievePartyByPlayerId,
      addPokemonToParty: addPokemonToParty,
      removePokemonFromParty: removePokemonFromParty
    }
};
exports.PlayerDbao = PlayerDbao;
