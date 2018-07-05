"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
// Connecting to Socket
var socketAddress = "http://localhost:3000";
var socket = io.connect(socketAddress);
window.addEventListener("load", init);
function init() {
    console.info("Läuft!");
}
