"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("../socket/socket.io-client");
// Connecting to Socket
const socketAddress = "http://localhost:3000";
const socket = socket_io_client_1.io.connect(socketAddress);
window.addEventListener("load", init);
function init() {
    console.info("Läuft!");
}
socket.on("connection", () => {
    console.log("Hallooo?");
});
//# sourceMappingURL=main.js.map