import * as io from "socket.io-client";

// Connecting to Socket
const socketAddress: string = "http://localhost:3000";
const socket = io.connect(socketAddress);

window.addEventListener("load", init);

function init(): void {
  console.info("Läuft!");
}
