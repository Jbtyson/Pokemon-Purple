// db.js
var mysql = require("mysql");
var Party = require("./party.js");
var PokemonInstance = require("./pokemonInstance.js");

var Db = function(host, username, password, database) {
    var connection =  mysql.createConnection({
    	host: host,
    	user: username,
    	password: password,
      database: database
    });

    // attempt authentication, -1 if failed
    var authenticate = function(username, password) {
      var query = "SELECT player_id FROM Users WHERE username=\'" + username + "\' AND password=\'" + password + "\'";
      connection.query(query, function(err,rows){
        if(err) {
          console.log(err);
          return -1;
        }

        // return the player id if they exist
        if(!!rows[0]) {
          return rows[0].player_id;
        }
        // otherwise return -1
        else {
          return -1;
        }
      });
    }

    // Retrieve the data for all of the pokemon instances in a party belonging to a playerid
    var retrieveParty = function(playerId) {
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

    return {
        connection: connection,
        authenticate: authenticate,
        addPokemonInstToParty: addPokemonInstToParty,
        removePokemonInstFromParty: removePokemonInstFromParty
    }
};
exports.Db = Db;
