var socket;

socket = io('http://localhost:8080');
//socket = io.connect("http://localhost", {port: 8080, transports: ["websocket"]});

socket.on("connect", onSocketConnected);
socket.on("auth failed", onAuthFailed);
socket.on("auth success", onAuthSuccess);
socket.on("disconnect", onSocketDisconnect);

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
}

function onSocketDisconnect() {
    console.log("Disconnected from socket server");
};
