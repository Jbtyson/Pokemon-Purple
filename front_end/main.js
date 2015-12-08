var socket;

//I'll need to change this
socket = io('http://localhost:8080');

var intro = new Audio("sounds/intro.mp3");
var battle = new Audio("sounds/battle-vs-trainer.mp3");
battle.loop = true;
var victory = new Audio("sounds/victory-vs-trainer.mp3");

var machine = null;

socket.on("connect", onSocketConnected);
socket.on("authResult", onAuthSuccess);
socket.on("disconnect", onSocketDisconnect);
socket.on("searchForWildPokemonResult", onSearchResult);

function onSocketConnected() {
    console.log("Connected to socket server");
};

function onAuthSuccess(message) {
  if(message.success) {
    console.log("Authentication successful.");
    console.log(message);
    //ok now we need to transistion from one state to another
    console.log(machine);
    machine.user = message.user;
    if(machine.state instanceof AuthState) {
      transition(machine, new MainMenuState(machine));
    } else {
      console.log("Authentication successful.");
    }
  } else {
    console.log("Authentication failed.");
  }
}

function onSearchResult(result) {
  console.log("Pokemon result");
  console.log(result);
  if(result.selectedPokemonInstance) {
    console.log("Found pokemon");
    transition(machine, new BattleChooseState(machine, result.selectedPokemonInstance, result.wildPokemon));
  } else {
    console.log("No pokemon found");
  }
}

function onSocketDisconnect() {
    console.log("Disconnected from socket server");
}

function onLoad() {
  console.log("Logging in with admin, test");
  socket.emit("authenticate", {username: "admin", password: "password"});
  //do some initlization
  var canvas = document.getElementById("myCanvas");
  gui = new Gui(canvas);
  gui.init();
  machine = {
    state: new AuthState(gui),
    aux: {},
    gui: gui,
    socket: socket
  };
  //log the machine and start things up
  console.log(machine);
  window.setInterval(function() {handleState(machine);}, 100);
}
