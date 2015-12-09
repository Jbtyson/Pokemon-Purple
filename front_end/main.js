var socket;

//I'll need to change this
socket = io('http://localhost:12345');

var intro = new Audio("sounds/opening.mp3");
intro.loop = true;
var battle = new Audio("sounds/battle-vs-trainer.mp3");
battle.loop = true;
var victory = new Audio("sounds/victory-vs-trainer.mp3");

var machine = null;

socket.on("connect", onSocketConnected);
socket.on("battleResult", onBattleEndResult);
socket.on("authResult", onAuthSuccess);
socket.on("searchForWildPokemonResult", onSearchResult);
socket.on("battleMoveSelectedResult", onBattleMoveResult);
socket.on("retrievePokedexResult", onPokedexResult);
socket.on("retrievePartyResult", onPartyResult);
socket.on("useItemResult", onUseItemResult);
socket.on("retrieveItemsResult", onRetriveItems);
socket.on("retrievePcResult", onRetrivePcResult);

function onUseItemResult(result) {

}

function onRetrivePcResult(result) {
  console.log("retrieve pc results!!");
  console.log(result);
  transition(machine, new PcViewState(machine, result));
}

function onBattleEndResult(result) {
  console.log("got the battle results!!");
  console.log(result);
  transition(machine, new MainMenuState(machine));
}

function onItemResult(result) {
  console.log("got the result of using an item");
  console.log(result);
  transition(machine, new DisplayItemUseState(machine, result.pokemon[0], result.pokemon[1], result.usedItem));
  setTimeout(function() {
    transition(machine, new BattleChooseState(machine, result.pokemon[0], result.pokemon[1]));
  }, 2000);
}

function onRetriveItems(result) {
  console.log("We got some items!!");
  console.log(result);
  transition(machine, new BattleItems(machine, result));
}

function onSocketConnected() {
    console.log("Connected to socket server");
}

function onPokedexResult(result) {
  console.log("we got a pokedex!!");
  console.log(result);
  transition(machine, new PokedexState(machine, result));
}

function onPartyResult(result) {
  console.log("we got a party!!");
  console.log(result);
  transition(machine, new PartyState(machine, result));
}

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

function onBattleMoveResult(result) {
  console.log("Battle move result");
  console.log(result);
  if(result.pokemon) {
    console.log("We diiiid it");
    transition(machine, new DisplayMoveState(machine, result.pokemon[0], result.pokemon[1], result.usedMove));
    if(result.attackingPokemonInstanceId != result.pokemon[0].id) {
      setTimeout(function() {
        transition(machine, new BattleChooseState(machine, result.pokemon[0], result.pokemon[1]));
      }, 1000);
    }
  } else {
    console.log("No pokemon found");
  }
}

function onLoad() {
  console.log("Logging in with admin, test");
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
  console.log(socket);
  socket.emit("authenticate", {username: "admin", password: "password"});
  //log the machine and start things up
  console.log(machine);
  window.setInterval(function() {handleState(machine);}, 100);
}
