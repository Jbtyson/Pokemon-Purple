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

    var onMoveSelected = function(playerId, pokemonInstanceId, moveId, callback) {
      battles[0].onMoveSelected(playerId, pokemonInstanceId, moveId, function(response) {
        callback(response);
      });
    }

    var createBattleWithWildPokemon = function(playerId, playerPokemonInstance, wildPokemonInstance) {
      var battleId = battleIdCounter++;
      var playerIds = [playerId, "AI"]
      var pokemons = [playerPokemonInstance, wildPokemonInstance];
      var wildPokemonBattle = true;
      var battle = new Battle(battleId, playerIds, pokemons, wildPokemonBattle);
      battles.push(battle);
    }

    var getTypeToTypeModifier = function(attackingTypeId, defendingTypeId) {
      return typeModifiers[attackingTypeId][defendingTypeId];
    }

    var resolveWildPokemonBattle = function(playerVictory, battleId) {
      var playerId;
      for(i = 0; i < battles.length; i++) {
        if(battles[i].battleId === battleId) {
          playerId = battles[i].players[0];
          battles.splice(i, 1);
        }
      }
      global.gameManager.messageUser(playerId, "battleResult", { victory: playerVictory });
    }

    return {
      battles: battles,
      init: init,
      onMoveSelected: onMoveSelected,
      createBattleWithWildPokemon: createBattleWithWildPokemon,
      resolveWildPokemonBattle: resolveWildPokemonBattle
    }
};
exports.BattleManager = BattleManager;
