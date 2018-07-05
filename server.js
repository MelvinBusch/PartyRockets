"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIO = require("socket.io");
var Express = require("express");
// Setting up Express Server
var app = Express();
var server = app.listen(process.env.PORT || 3000, serverInit);
app.use(Express.static("public"));
function serverInit() {
    console.log("Server is Listening");
}
// Socket Connection
var socket = SocketIO(server);
socket.on("connection", function (_socket) {
    console.log("New Socket Connection " + _socket);
});
