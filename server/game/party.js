// party.js
var Party = function() {
    var size;
    var playerId;
    var members = [];

    // Adds a pokemon instance id to the party
    var addPokemon = function(pokemonInst) {
      if(members.length < 6) {
        members.push(pokemonInstId);
        return ++size;
      }
      else {
        console.log("Cannot add more than 6 Pokemon to a party");
        return -1;
      }
    }

    // Removes a pokemon instance id from the party
    var removePokemon = function(pokemonInst) {
      for(i = 0; i < members.length; i++) {
        if(members[i].pokemonInstId === pokemonInstId) {
          members.splice(i, 1);
          return --size;
        }
      }
      console.log("PokemonInstance was not found");
      return -1;
    }

    return {
        addPokemon: addPokemon,
        removePokemon: removePokemon
    }
};
exports.Party = Party;
