///<reference path="../socket/socket.io-client.d.ts" />
// Connecting to Socket
// const socketAddress: string = "http://localhost:3000";
const socketAddress = "http://192.168.2.107:3001";
const socket = io.connect(socketAddress);
let room;
let player;
let numPlayers = 0;
let engine = "";
// Start Page
let startPage;
// Join Room
let joinRoom;
let qrCode;
let qrLink;
let players;
let launchButton;
// Wait Room
let waitRoom;
let nameField;
let takeoffButton;
let playerFeedback;
let playerName;
// Rocket Controll
let rocketControl;
let fireButton;
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
            setTimeout(() => slidePageUp(startPage), 1500);
        });
        // Tell Server that Room has been created
        socket.emit("createRoom", room.data());
        // Wait for Players to join the Game
        socket.on("masterResponse", (_response) => {
            if (_response.success) {
                showPlayerCard(_response.id, _response.name, _response.engine);
                numPlayers++;
                checkForAllPlayers();
            }
        });
        // Handle unexpected disconnect
        socket.on("playerDisconnect", (_playerID) => {
            document.getElementById(_playerID).remove();
            numPlayers--;
            checkForAllPlayers();
        });
        // Tell Server that all Players are Ready
        launchButton.addEventListener("click", () => {
            socket.emit("ready", room.data());
            setup();
        });
        // Start the Game
        // let countdown: Countdown = new Countdown(5);
        socket.on("start", (_room) => {
            slidePageUp(joinRoom);
            // countdown.count();
        });
    }
    else {
        // Setup View for Player
        startPage.style.display = "none";
        joinRoom.style.display = "none";
        waitRoom.style.display = "block"; // "block"
        rocketControl.style.display = "block";
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
            socket.on("start", (_response) => console.log(_response));
        });
        // Give User Feedback about Connection
        socket.on("playerResponse", (_response) => {
            if (_response.success) {
                playerFeedback.innerText = "You are connected to the Game! Wait for your friends to connect xD";
                playerFeedback.style.color = "white";
                engine = _response.engine;
            }
            else {
                playerFeedback.innerText = "Sorry, there went something wrong connecting to the Game >_<";
                playerFeedback.style.color = "white";
                nameField.style.display = "none";
                takeoffButton.style.display = "none";
            }
        });
        // Show Rocket Control
        socket.on("start", () => {
            slidePageUp(waitRoom);
        });
    }
}
function initDOMVariables() {
    // Start Page
    startPage = document.getElementById("startPage");
    // Join Room
    joinRoom = document.getElementById("joinRoom");
    qrCode = document.getElementById("qrCode");
    qrLink = document.getElementById("qrLink");
    players = document.getElementById("players");
    launchButton = document.getElementById("launchBtn");
    // Wait Room
    waitRoom = document.getElementById("waitRoom");
    nameField = document.getElementById("nameField");
    takeoffButton = document.getElementById("takeoffButton");
    playerFeedback = document.getElementById("playerFeedback");
    // Rocket Controll
    rocketControl = document.getElementById("rocketControl");
    fireButton = document.getElementById("fireButton");
}
function slidePageUp(_page) {
    _page.style.top = -window.innerHeight + "px";
}
function showPlayerCard(_id, _name, _engine) {
    players.innerHTML += `
    <div class="player" id="${_id}">
      <img src="img/icons/rocket-color.png" alt="Rocket-Color" class="mini-rocket">
      <div class="playerName">${_name}</div>
      <div class="playerControl">${_engine.toUpperCase()} Engine</div>
    </div>
  `;
}
function checkForAllPlayers() {
    if (numPlayers >= 1) {
        launchButton.style.display = "block";
    }
    else {
        launchButton.style.display = "none";
    }
}
//# sourceMappingURL=main.js.map