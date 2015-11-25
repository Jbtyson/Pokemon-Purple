// user.js
var User = function(p_socket, p_username, p_password) {
    var socket = p_socket,
        username = p_username,
        password = p_password,
        playerId = -1;

    return {
        socket: socket,
        playerId: playerId,
        username: username,
    }
};
exports.User = User;
