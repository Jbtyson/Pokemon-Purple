// playerManager.js
var PlayerManager = function(_playerService) {
  var playerService = _playerService;
  var players = {};

  var init = function() {

  }

  var newPlayerConnected = function() {

  }

  var playerDisconnected = function() {

  }

  var wildPokemonCaughtForPlayer = function(playerId, pokemonInstance) {
    if(players[playerId].party.length >= 6) {
      playerService.sendPokemonInstanceToPc(playerId, pokemonInstance.pokemonInstanceId);
    }
    else {
      playerService.addPokemonToParty(playerId, pokemonInstance.pokemonInstanceId);
      players[playerId].party.push(pokemonInstance);
    }
  }

  return {
    players: players,
    init: init,
    newPlayerConnected: newPlayerConnected,
    playerDisconnected: playerDisconnected,
    wildPokemonCaughtForPlayer: wildPokemonCaughtForPlayer
  }
}
exports.PlayerManager = PlayerManager;
