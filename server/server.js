// server.js
var util = require("util"),
    io = require("socket.io"),
    mysql = require("mysql"),
    // services
    Db = require("./services/db").Db,
    UserService = require("./services/userService/userService").UserService,
    PlayerService = require("./services/playerService/playerService").PlayerService,
    PokemonService = require("./services/pokemonService/pokemonService").PokemonService,
    ItemService = require("./services/itemService/itemService").ItemService,
    RegionService = require("./services/regionService/regionService").RegionService,
    // game
    GameManager = require("./game/gameManager").GameManager;

var PORT = 12345,
    DB_HOST = "mysql.cis.ksu.edu";
    DB_USERNAME = "jbtyson";
    DB_PASSWORD = "secretpassword"
    DB_NAME = "jbtyson";

var socket;
var users;
var dbConnection;
var db;
var userService,
    playerService,
    pokemonService,
    itemService,
    regionService;
var gameManager;

function init() {
  console.log("Initializing...");
  users = [];

  console.log("Connecting to db...");
  db = new Db(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
  console.log("Db connection complete.")

  userService = new UserService(db);
  playerService = new PlayerService(db);
  pokemonService = new PokemonService(db);
  itemService = new ItemService(db);
  regionService = new RegionService(db);

  gameManager = new GameManager(regionService, pokemonService, playerService);
  global.gameManager = gameManager;
  console.log("Initialization complete.");
  socket = io.listen(PORT);
  console.log("Listening on port " + PORT);
  console.log("=======================");
  setEventHandlers();

  gameManager.startGame(regionService, pokemonService, playerService);
}

var setEventHandlers = function() {
  socket.sockets.on("connection", onSocketConnection);
};

var onSocketConnection = function(client) {
  util.log("New player has connected: " + client.id);
  client.on("disconnect", onClientDisconnect);
  client.on("authenticate", onAuthenticate);
  client.on("retrieveParty", onRetrieveParty);
  client.on("tryCatchWildPokemon", onTryCatchWildPokemon);
  client.on("searchForWildPokemon", onSearchForWildPokemon);
  client.on("battleMoveSelected", onBattleMoveSelected);
  client.on("retrievePokedex", onRetrievePokedex);
  client.on("retrievePc", onRetrievePc);
  client.on("runFromBattle", onRunFromBattle);
  client.on("switchActivePokemon", onSwitchActivePokemon);
  client.on("retrieveItemsInBag", onRetrieveItemsInBag);
}

global.sendMessage = function(clientId, messageType, message) {
  io.sockets.connected(clientId).emit(messageType, message);
}

/** Attempt authentication based on username and password
 * "authenticate" message expects:
 * string username
 * string password
 *
 * <returns>
 * boolean: success
 * User: user
*/
function onAuthenticate(message) {
  var username = message.username,
      password = message.password;

  var _this = this;
  userService.attemptUserLogin(username, password, _this, function(response) {
    _this.emit("authResult", response);
  });
}

// Retrieves a party for a specified party Id
function onRetrieveParty(message) {
  var playerId = message.playerId;

  var _this = this;
  playerService.retrievePartyByPlayerId(playerId, function(response) {
    _this.emit("retrievePartyResult", response);
  });
}

// Attempts to catch wild pokemon
function onTryCatchWildPokemon(message) {
  var playerId = message.playerId,
      pokemonInstanceId = message.PokemonInstanceId;

  var _this = this;
  gameManager.wildPokemonManager.onTryCatchWildPokemon(playerId, pokemonInstnaceId, function(response) {
    this.emit("tryCatchWildPokemonResult", response);
  });
}

// Search for a wile pokemon to battle
function onSearchForWildPokemon(message) {
  var playerId = message.playerId,
      geoLocation = message.geoLocation,
      response;

  var _this = this;
  gameManager.wildPokemonManager.onSearchForWildPokemon(playerId, geoLocation, function(response) {
    _this.emit("searchForWildPokemonResult", response);
  });
}

// Use a move in a battle
function onBattleMoveSelected(message) {
  var playerId = message.playerId,
      pokemonInstanceId = message.pokemonInstanceId,
      moveId = message.moveId;

  var _this = this;
  gameManager.battleManager.onMoveSelected(playerId, pokemonInstanceId, moveId, function(responseType, response) {
    console.log("sending message type: " + responseType);
    _this.emit(responseType, response);
  });
}

function onRetrievePokedex(message) {
  var _this = this;
  pokemonService.retrieveAllBasePokemon(function(response) {
    _this.emit("retrievePokedexResult", response);
  });
}

function onRetrievePc(message) {
  var playerId = message.playerId;

  var _this = this;
  playerService.retrievePcByPlayerId(playerId, function(response) {
    _this.emit("retrievePcResult", response);
  });
}

function onRunFromBattle(message) {
  var playerId = message.playerId;

  var _this = this;
  gameManager.battleManager.onRunFromBattle(playerId, function(response) {
    _this.emit("runFromBattleResult", response);
  });
}

function onSwitchActivePokemon(message) {
  var playerId = message.playerId;
  var pokemonInstanceId = message.pokemonInstanceId;

  var _this = this;
  gameManager.battleManager.onSwitchActivePokemon(playerId, pokemonInstanceId, function(response) {
    _this.emit("switchActivePokemonResult", response);
  });
}

function onRetreiveItemsInBag(message) {
  var playerId = message.playerId;

  var _this = this;
  itemService.retrieveAllItemsInBag(playerId, function(response) {
    _this.emit("retrieveItemsInBagResult", response);
  });
}

function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);
};

init();
