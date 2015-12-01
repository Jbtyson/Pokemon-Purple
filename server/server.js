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


var PORT = 8080,
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

function init() {
  console.log("Initializing...");
  users = [];

  console.log("Connecting to db...");
  db = new Db(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
  console.log("Db connection complete.")

  gameManager = new GameManager();

  userService = new UserService(db, gameManager);
  playerService = new PlayerService(db);
  pokemonService = new PokemonService(db);
  itemService = new ItemService(db);
  regionService = new RegionService(db);

  console.log("Initialization complete.");
  socket = io.listen(PORT);
  console.log("Listening on port " + PORT);
  console.log("=======================");
  setEventHandlers();

  gameManager.startGame(regionService);
}

var setEventHandlers = function() {
  socket.sockets.on("connection", onSocketConnection);
};

var onSocketConnection = function(client) {
  util.log("New player has connected: " + client.id);
  client.on("disconnect", onClientDisconnect);

  // user messages
  client.on("authenticate", onAuthenticate);

  // player messages
  client.on("retrieve party", onRetrieveParty);
}

// Attempt authentication based on username and password
function onAuthenticate(message) {
  var username = message.username,
      password = message.password,
      response;

  response = userService.attemptUserLogin(username, password)
  this.emit("authResult", response);
}

// Retrieves a party for a specified party Id
function onRetrieveParty(message) {
  var playerId = message.playerId,
      response;

  response = playerSerivce.retrievePlayerById(playerId)
  this.emit("party", response);

  // needs to be moved to playerService
  /*
  util.log(this.id + "requesting party of player: " + message.playerId);
  var party = db.retrieveParty(message.playerId);

  if(party == NULL) {
    // retrieve party failed
    this.emit("party error");
  }
  else {
    //retrieve party was successful
    this.emit("party", {party:party});
  }*/
}
/*
// Retrieve a specific pokemon instance based on their id
function onRetrievePokemonInstance(message) {
  util.log(this.id + "requesting pokemon instance: " + message.pokemonId + " - " + message.pokemonInstId);
  var pkmnInst = db.retrievePokemonInstance(message.pokemonId, message.pokemonInstId);

}*/

function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);
};

init();
