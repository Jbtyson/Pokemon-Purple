// batleManager.js
var Battle = function(id, _players, _pokemon, _wildPokemonBattle) {
    var battleId = id;
    var players = _players;
    var pokemon = _pokemon;
    var playerTurn = 0;
    var wildPokemonBattle = _wildPokemonBattle;

    var onMoveSelected = function(playerId, pokemonInstanceId, moveId, callback) {
      if(players[playerTurn] !== playerId) {
        response = { ERROR: "Incorrect player's turn." }
        callback(reponse);
        return;
      }

      var response = {
        players: players,
        pokemon: pokemon,
        attackingPokemonInstanceId: pokemonInstanceId,
        usedMove: null
      }

      var attackingPokemon = pokemon[playerTurn];
      var defendingPokemon = pokemon[1-playerTurn];
      var move;
      for(i = 0; i < attackingPokemon.moves.length; i++) {
        if(attackingPokemon.moves[i].moveId === moveId) {
          move = attackingPokemon.moves[i];
          response.usedMove = move;
        }
      }
      defendingPokemon = performMove(attackingPokemon, defendingPokemon, move);
      switchTurns();
      callback(response);

      if(wildPokemonBattle) {
        // check for player victory
        if(defendingPokemon.curHp === 0) {
          var playerVictory = true;
          global.gameManager.battleManager.resolveWildPokemonBattle(playerVictory, battleId);
          return;
        }

        // perform random attack
        var rand = Math.floor(Math.random() * defendingPokemon.moves.length);
        attackingPokemon = performMove(defendingPokemon, attackingPokemon, defendingPokemon.moves[rand]);
        response.usedMove = defendingPokemon.moves[rand];
        response.attackingPokemonInstanceId = defendingPokemon.id;
        switchTurns();
        // busy wait for demo
        setTimeout(function() {
          callback(response);
        }, 2500);

        // check for player loss
        if(attackingPokemon.curHp <= 0) {
          var playerVictory = false;
          global.gameManager.battleManager.resolveWildPokemonBattle(playerVictory, battleId);\
          return;
        }
      }
    }

    var switchTurns = function() {
      if(playerTurn = 0) {
        playerTurn = 1;
      }
      else {
        playerTurn = 0;
      }
    }

    var performMove = function(attackingPokemon, defendingPokemon, move) {
      if(move.pp > 0) {
        move.pp--;
        var attack;
        var defense;
        if(true) { //move is physical
          attack = attackingPokemon.att;
          defense = defendingPokemon.def;
        }
        else { // move is not special
          attack = attackingPokemon.spcAtt;
          defense = defendingPokemon.spcDef;
        }
        var level;
        if(determineCritical(attackingPokemon.speed)) {
          level = attackingPokemon.level * 2;
        }
        else {
          level = attackingPokemon.level;
        }
        baseDamage = calculateDamage(attackingPokemon.level, move.power, attack, defense);
        modifier = 1; //calculateModifier(move.typeId, attackingPokemon.types, defendingPokemon.types);
        finalDamage = Math.ceil(baseDamage * modifier);
        defendingPokemon.curHp -= 100; //finalDamage;
        if(defendingPokemon.curHp <= 0) {
          defendingPokemon.curHp = 0;
        }
      }

      return defendingPokemon;
    }

    var calculateDamage = function(level, power, attack, defense) {
      var damage = ((2 * level + 10) / 250) * (attack / defense) * power + 2;
      return damage;
    }

    var determineCritical = function(speed) {
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

      var mod1 = global.gameManager.battleManager.getTypeToTypeModifier(moveTypeId, defendingPokemonTypes[0]);
      var mod2 = 1;
      if(!!defendingPokemonTypes[1]) {
        global.gameManager.battleManager.getTypeToTypeModifier(moveTypeId, defendingPokemonTypes[1]);
      }

      return mod1 * mod2 * stab;
    }

    return {
      battleId: battleId,
      players: players,
      pokemon: pokemon,
      playerTurn: playerTurn,
      onMoveSelected: onMoveSelected,
      wildPokemonBattle: wildPokemonBattle
    }
};
exports.Battle = Battle;
