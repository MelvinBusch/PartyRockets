///<reference path="../socket/socket.io-client.d.ts" />
// Connecting to Socket
const socketAddress = "http://localhost:3000";
const socket = io.connect(socketAddress);
window.addEventListener("load", init);
function init() {
    console.info("Läuft!");
}
socket.on("connection", () => {
    console.log("Hallooo?");
});
//# sourceMappingURL=main.js.map