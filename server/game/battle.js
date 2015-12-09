// batleManager.js
var Battle = function(_battleManager, id, players, pokemon) {
    var battleManager = _battleManager;
    var battleId = id;
    var players = [];
    var pokemon = [];
    var playerTurn = 0;

    var init = function() {

    }

    var onMoveSelected = function(playerId, moveId, callback) {
      if(players[playerTurn].playerId !== playerId) {
        response = { ERROR: "Incorrect player's turn." }
        callback(reponse);
        return;
      }

      var response = {
        players: players,
        pokemon: pokemon
      }

      var attackingPokemon = pokemon[playerTurn];
      var defendingPokemon = pokemon[1-playerTurn];
      var move;
      for(i = 0; i < attackingPokemon.moves.length) {
        if(attackingPokemon.moves[i].moveId = moveId) {
          move = atttackingPokemon.moves[i];
        }
      }
      performMove(attackingPokemon, defendingPokemon, move);

      callback(response);
    }

    var performMove = function(attackingPokemon, defendingPokemon, move) {
      if(move.pp > 0) {
        var attack;
        var defense;
        if(true) { //move is physical
          attack = attackingPokemon.attack;
          defense = defendingPokemon.defense;
        }
        else { // move is not special
          attack = attackingPokemon.specialAttack;
          defense = defendingPokemon.specialDefense;
        }
        var level;
        if(calculateCritical) {
          level = attackingPokemon.level * 2;
        }
        else {
          level = attackingPokemon.level;
        }
        baseDamage = calculateDamage(attackingPokemon.level, move.power, attack, defense);
        modifier = calculateModifier(move.typeId, attackingPokemon.types, defendingPokemon.types);
        finalDamage = baseDamage * modifier;
        defendingPokemon.curHp -= finalDamage;
        move.pp--;
      }

      return defendingPokemon;
    }

    var calculateDamage = function(level, power, attack, defense) {
      var damage = ((2 * level + 10) / 250) * (attack / defense) * power + 2;
      return damage;
    }

    var calculateCritMod = function(speed) {
      var chance = speed / 256;
      var rand = Math.random() * 100;
      return chance <= rand;
    }

    var calculateModifier = function(moveTypeId, attackingPokemonTypes, defendingPokemonTypes) {
      var stab = 1;
      if(moveTypeId === attackingPokemonTypes[0]) {
        stab = 1.5;
      }
      else if(!!attackingPokemonTypes[1] && moveTypeId === attackingPokemonTypes[1]) {
        stab = 1.5;
      }

      var mod1 = battleManager.getTypeToTypeModifier(moveTypeId, defendingPokemonTypes[0]);
      var mod2 = 1;
      if(!!defendingPokemonTypes[1]) {
        battleManager.getTypeToTypeModifier(moveTypeId, defendingPokemonTypes[1]);
      }

      return mod1 * mod2 * stab;
    }

    return {
      battles: battles,
      init: init,
      onMoveSelected: onMoveSelected,
    }
};
exports.Battle = Battle;
