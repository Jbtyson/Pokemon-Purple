// batleManager.js
var BattleManager = function(_pokemonService) {
    pokemonService = _pokemonService;
    var battles = [];
    var typeModifiers = [];
    var battleIdCount = 0;

    var init = function() {
      buildTypeRelations();
    }

    var buildTypeRelations() {
      pokemonService.retrieveAllTypeRelations(function(relations) {
        typeModifiers = relations;
      });
    }

    var onMoveSelected = function() {

    }

    var createBattleWithWildPokemon = function(playerId1, playerId2) {
      var battle = new Battle(this, battleIdCount, playerId, pokemonInstanceId);
      battleIdCount++;
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
