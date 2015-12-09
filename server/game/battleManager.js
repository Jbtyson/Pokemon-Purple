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
      battles[0].onMoveSelected(playerId, pokemonInstanceId, moveId, function(responseType, response) {
        callback(responseType, response);
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
      for(i = 0; i < battles.length; i++) {
        if(battles[i].battleId === battleId) {
          battles.splice(i, 1);
        }
      }
    }

    var onRunFromBattle = function(playerId, callback) {
      for(i = 0; i < battles.length; i++) {
        for(j = 0; players.length; j++) {
          if(battles[i].players[j] === playerId) {
            battles.splice(i, 1);
          }
        }
      }

      callback({});
    }

    var onSwitchActivePokemon = function(playerId, pokemonInstanceId, callback) {
      pokemonService.retrievePokemonInstanceById(pokemonInstanceId, function(pokemonInstance) {
        battleIndex = findBattleIndexOfPlayer(playerId);
        battles[i].switchActivePokemon(playerId, pokemonInstance, function(response) {

        });
      });
    }

    var findBattleIndexOfPlayer = function(playerId) {
      for(i = 0; i < battles.length; i++) {
        for(j = 0; battles[i].players.length; j++) {
          if(battles[i].players[j] === playerId) {
            return i;
          }
        }
      }

      return -1;
    }

    return {
      battles: battles,
      init: init,
      onMoveSelected: onMoveSelected,
      createBattleWithWildPokemon: createBattleWithWildPokemon,
      resolveWildPokemonBattle: resolveWildPokemonBattle,
      onRunFromBattle: onRunFromBattle,
      onSwitchActivePokemon: onSwitchActivePokemon
    }
};
exports.BattleManager = BattleManager;
