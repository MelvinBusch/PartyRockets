///<reference path="../socket/socket.io-client.d.ts" />
// Connecting to Socket
// const socketAddress: string = "http://localhost:3000";
const socketAddress = "http://192.168.2.107:3001";
const socket = io.connect(socketAddress);
let room;
let player;
let startPage;
let joinRoom;
let waitRoom;
let qrCode;
let qrLink;
let players;
let startButton;
let nameField;
let takeoffButton;
let playerName;
window.addEventListener("load", init);
function init() {
    console.info("Anwendung gestartet!");
    initDOMVariables();
    // Parse URL
    let pageURL = window.location.search;
    let query = pageURL.replace("?room=", "");
    if (query === "") {
        // Create new Room
        room = new Room();
        room.fetchQRCode().then((_imgURL) => {
            qrCode.src = _imgURL + "";
            qrLink.innerText = room.url;
            qrLink.href = room.url;
            setTimeout(() => slidePageUp("startPage"), 1500);
        });
        // Tell Server that Room has been created
        socket.emit("createRoom", room.data());
        // Wait for Players to join the Game
        // call Animation Setup
        setup();
    }
    else {
        // Setup View for Player
        startPage.style.display = "none";
        joinRoom.style.display = "none";
        waitRoom.style.display = "block";
        // Wait for Player to enter his Name
        takeoffButton.addEventListener("click", () => {
            if (nameField.value != "") {
                playerName = nameField.value;
                nameField.readOnly = true;
                nameField.style.boxShadow = "none";
                takeoffButton.style.display = "none";
                // Create Player Object and send to Server
                let player = new Player(query, playerName);
                socket.emit("createPlayer", player.data());
            }
            else {
                // If no Name was entered:
                nameField.style.boxShadow = "0px 0px 0px 2px rgb(167, 49, 66)";
            }
        });
        socket.on("playerResponse", (_success) => console.log(_success));
    }
}
function initDOMVariables() {
    waitRoom = document.getElementById("waitRoom");
    startPage = document.getElementById("startPage");
    joinRoom = document.getElementById("joinRoom");
    qrCode = document.getElementById("qrCode");
    qrLink = document.getElementById("qrLink");
    players = document.getElementById("players");
    startButton = document.getElementById("launchBtn");
    nameField = document.getElementById("nameField");
    takeoffButton = document.getElementById("takeoffButton");
}
function slidePageUp(_page) {
    let page = document.getElementById(_page);
    page.style.top = -window.innerHeight + "px";
}
function showPlayerCard(_playerName) {
    players.innerHTML += `
    <figure class="player" id="${_playerName}">
      <img src="img/icons/rocket-color.png" alt="Rocket-Color" class="mini-rocket">
      <figcaption>${_playerName}</figcaption>
    </figure>
  `;
}
//# sourceMappingURL=main.js.map