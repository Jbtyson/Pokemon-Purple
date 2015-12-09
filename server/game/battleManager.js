// batleManager.js
var BattleManager = function(_pokemonService) {
    pokemonService = _pokemonService;
    var battles = [];
    var typeModifiers = [];
    var battleIdCounter = 0;

    var init = function() {
      buildTypeRelations();
    }

    var buildTypeRelations() {
      pokemonService.retrieveAllTypeRelations(function(relations) {
        typeModifiers = relations;
      });
    }

    var onMoveSelected = function(playerId, moveId, callback) {
      battles[0].onMoveSelected(playerId, moveId, function(response) {
        callback(response);
      }));
    }

    var createBattleWithWildPokemon = function(playerId, playerPokemonInstance, wildPokemonInstance) {
      var battleId = battleIdCounter++;
      playerIds = {
        player1: playerId,
        player2: "AI"
      };
      pokemons = {
        pokemon1: playerPokemonInstance,
        pokemon2: wildPokemonInstance
      };
      var battle = new Battle(this, battleId, players, pokemons);
      battles.push(battle);
    }

    var getTypeToTypeModifier = function(attackingTypeId, defendingTypeId) {
      return typeModifiers[attackingTypeId][defendingTypeId];
    }

    return {
      battles: battles,
      init: init,
      onMoveSelected: onMoveSelected
    }
};
exports.BattleManager = BattleManager;
