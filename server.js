"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const SocketIO = require("socket.io");
// Setting up Express Server
const app = Express();
const server = app.listen(process.env.PORT || 3000, serverInit);
app.use(Express.static("public"));
function serverInit() {
    console.log("Server is Listening");
}
// Socket Connection
let socket = SocketIO(server);
socket.on("connection", function (_socket) {
    console.log("New Socket Connection " + _socket);
});
//# sourceMappingURL=server.js.map