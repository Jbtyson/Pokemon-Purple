// db.js
var Party = require("./party.js");

var Db = function(p_connection) {
    var connection = p_connection;

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

    var retrieveParty = function(playerId) {
      var query = "SELECT * FROM Party WHERE playerId=" + playerId;
      connection.query(query, function(err, rows) {
        if(err) {
          console.log(err)
          return NULL;
        }

        party = new Party();
        for(i = 0; i < rows.length; i++) {
          party.addPokemonInstToParty(rows[i]);
        }
        return party;
      })
    }

    var addPokemonInstToParty = function(pokemonInstId, playerId) {

    }

    var removePokemonInstFromParty = function(pokemonInstId, playerId) {

    }

    return {
        authenticate: authenticate,
        addPokemonInstToParty: addPokemonInstToParty,
        removePokemonInstFromParty: removePokemonInstFromParty
    }
};
exports.Db = Db;
