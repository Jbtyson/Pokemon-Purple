// batleManager.js
var Battle = function(id, _players, _pokemon) {
    var battleId = id;
    var players = _players;
    var pokemon = _pokemon;
    var playerTurn = 0;

    var onMoveSelected = function(playerId, moveId, callback) {
      if(players[playerTurn] !== playerId) {
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
      for(i = 0; i < attackingPokemon.moves.length; i++) {
        if(attackingPokemon.moves[i].moveId === moveId) {
          move = attackingPokemon.moves[i];
        }
      }
      defendingPokemon = performMove(attackingPokemon, defendingPokemon, move);
      switchTurns();

      callback(response);

      if(players[1] === "AI") {
        var rand = Math.floor(Math.random() * defendingPokemon.moves.length);
        attackingPokemon = performMove(defendingPokemon, attackingPokemon, defendingPokemon.moves[rand]);
        switchTurns();
        callback(response);
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
      console.log(move);
      if(move.pp > 0) {
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
        defendingPokemon.curHp -= finalDamage;
        move.pp--;
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
      onMoveSelected: onMoveSelected
    }
};
exports.Battle = Battle;
