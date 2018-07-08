///<reference path="../socket/socket.io-client.d.ts" />
// Connecting to Socket
const socketAddress = "http://localhost:3000";
const socket = io.connect(socketAddress);
let qrCode;
let qrAltLink;
let rockets;
let startButton;
let room;
let rooms = [];
window.addEventListener("load", init);
function init() {
    console.info("Anwendung gestartet!");
    // Parse URL
    let pageURL = window.location.search;
    let roomID = pageURL.replace("?room=", "");
    if (roomID === "") {
        initGameMenu();
        // Create new Room
        room = new Room();
        room.generateQRCode().then((_imgURL) => {
            qrCode.src = _imgURL + "";
            qrAltLink.innerText = room.roomURL;
            qrAltLink.href = room.roomURL;
            setTimeout(() => slidePageUp("startPage"), 1500);
        });
        rooms.push(room);
        // TODO: Rooms Array in Datenbank ablegen
        setup();
    }
    else {
        console.log("Join Room!");
        socket.emit("newPlayer", roomID);
    }
}
function initGameMenu() {
    qrCode = document.getElementById("qrCode");
    qrAltLink = document.getElementById("qrAltLink");
    rockets = document.getElementsByClassName("mini-rocket");
    startButton = document.getElementById("launchBtn");
}
function slidePageUp(_page) {
    let page = document.getElementById(_page);
    page.style.top = -window.innerHeight + "px";
}
//# sourceMappingURL=main.js.map