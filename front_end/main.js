var socket;

//I'll need to change this
socket = io('http://localhost:8080');

socket.on("connect", onSocketConnected);
socket.on("auth failed", onAuthFailed);
socket.on("auth success", onAuthSuccess);
socket.on("disconnect", onSocketDisconnect);

var canvas = document.getElementById("myCanvas");
gui = new Gui(canvas);
gui.init();

var machine = {
  state: new AuthState(),
  aux: {},
  gui: gui,
  socket: socket
};

function onSocketConnected() {
    console.log("Connected to socket server");
    console.log("Logging in with admin, test");
    socket.emit("authenticate", {username: "admin", password: "password"});
};

function onAuthFailed() {
  console.log("Authentication failed.");
}

function onAuthSuccess(user) {
  console.log("Authentication successful.");
  console.log(user);
  //ok now we need to transistion from one state to another
  transition(machine, mainMenu, user);
}

function onSocketDisconnect() {
    console.log("Disconnected from socket server");
}

function onLoad() {
  handleState(machine);
}
