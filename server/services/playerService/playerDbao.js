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

    return {
      db: db,
      retrievePartyByPlayerId: retrievePartyByPlayerId
    }
};
exports.PlayerDbao = PlayerDbao;
