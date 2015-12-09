// batleManager.js
var Battle = require("./battle.js").Battle;

var BattleManager = function(_pokemonService) {
    pokemonService = _pokemonService;
    var battles = [];
    var typeModifiers = [];
    var battleIdCounter = 0;

    var init = function() {
      buildTypeRelations();
    }

    var buildTypeRelations =function() {
      pokemonService.retrieveAllTypeRelations(function(relations) {
        typeModifiers = relations;
      });
    }

    var onMoveSelected = function(playerId, moveId, callback) {
      battles[0].onMoveSelected(playerId, moveId, function(response) {
        callback(response);
      });
    }

    var createBattleWithWildPokemon = function(playerId, playerPokemonInstance, wildPokemonInstance) {
      var battleId = battleIdCounter++;
      var playerIds = [playerId, "AI"]
      var pokemons = [playerPokemonInstance, wildPokemonInstance];
      var battle = new Battle(battleId, playerIds, pokemons);
      battles.push(battle);
    }

    var getTypeToTypeModifier = function(attackingTypeId, defendingTypeId) {
      return typeModifiers[attackingTypeId][defendingTypeId];
    }

    return {
      battles: battles,
      init: init,
      onMoveSelected: onMoveSelected,
      createBattleWithWildPokemon: createBattleWithWildPokemon
    }
};
exports.BattleManager = BattleManager;
