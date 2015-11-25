// db.js
var mysql = require("mysql");

var Db = function(host, username, password, database) {
    var connection =  mysql.createConnection({
    	host: host,
    	user: username,
    	password: password,
      database: database
    });

    var query = function(query) {
      var result;
      connection.query(query, function(err, rows) {
        if(err) {
          console.log(err);
          result = "NULL";
        }
        else {
          result = rows;
        }
      });

      return result;
    }
/*

    // Retrieve the data for all of the pokemon instances in a party belonging to a playerid
    var retrieveParty = function(playerId, attributes) {
      var query = "SELECT * FROM Pokemon_Instances JOIN Parties ON Pokemon_Instances.pokemon_instance_id = Parties.pokemon_instance_id WHERE Parties.player_id=" + playerId;
      connection.query(query, function(err, rows) {
        if(err) {
          console.log(err);
          return NULL;
        }

        var party = new Party();
        for(i = 0; i < rows.length; i++) {
          var pkmn = new PokemonInstance();
          party.addPokemon(pkmn);
        }
        return party;
      });
    }

    var addPokemonInstToParty = function(pokemonInstId, playerId) {

    }

    var removePokemonInstFromParty = function(pokemonInstId, playerId) {

    }
*/
    return {
        connection: connection
        //authenticate: authenticate,
        //addPokemonInstToParty: addPokemonInstToParty,
        //removePokemonInstFromParty: removePokemonInstFromParty
    }
};
exports.Db = Db;
