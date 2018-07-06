///<reference path="../socket/socket.io-client.d.ts" />

// Connecting to Socket
const socketAddress: string = "http://localhost:3000";
const socket: SocketIOClient.Socket = io.connect(socketAddress);

window.addEventListener("load", init);

function init(): void {
  console.info("Läuft!");
}
socket.on("connection", () => {
  console.log("Hallooo?");
});
