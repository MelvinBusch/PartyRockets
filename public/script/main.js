///<reference path="../socket/socket.io-client.d.ts" />
// Connecting to Socket
var socketAddress = "https://eia-melvin.herokuapp.com/";
var socket = io.connect(socketAddress);
var room;
var player;
var numPlayers = 0;
var engine = "";
// Start Page
var startPage;
// Join Room
var joinRoom;
var qrCode;
var qrLink;
var players;
var launchButton;
// Wait Room
var waitRoom;
var nameField;
var takeoffButton;
var playerFeedback;
var playerName;
// Rocket Controll
var rocketControl;
var fireButton;
// End Screen
var endScreen;
var messageBox;
var restartButton;
window.addEventListener("load", init);
function init() {
    console.info("Anwendung gestartet!");
    initDOMVariables();
    // Parse URL
    var pageURL = window.location.search;
    var query = pageURL.replace("?room=", "");
    console.log(window.location.search);
    if (query === "") {
        // Create new Room
        room = new Room();
        room.fetchQRCode().then(function (_imgURL) {
            qrCode.src = _imgURL + "";
            qrLink.innerText = room.url;
            qrLink.href = room.url;
            setTimeout(function () { return slidePageUp(startPage); }, 1500);
        });
        // Tell Server that Room has been created
        socket.emit("createRoom", room.data());
        // Wait for Players to join the Game
        socket.on("masterResponse", function (_response) {
            if (_response.success) {
                showPlayerCard(_response.id, _response.name, _response.engine);
                numPlayers++;
                checkForAllPlayers();
            }
        });
        // Handle unexpected disconnect
        socket.on("playerDisconnect", function (_playerID) {
            document.getElementById(_playerID).remove();
            numPlayers--;
            checkForAllPlayers();
        });
        // Tell Server that all Players are Ready
        launchButton.addEventListener("click", function () {
            socket.emit("ready", room.data());
            setup();
        });
        // Start the Game
        socket.on("start", function (_room) {
            slidePageUp(joinRoom);
        });
        // Restart Game
        socket.on("restart", function (_message) {
            messageBox.innerText = _message.message;
            setTimeout(function () {
                endScreen.style.top = "0";
                endScreen.style.display = "block";
            }, 1000);
        });
        restartButton.addEventListener("click", function () {
            setup();
            slidePageUp(endScreen);
        });
    }
    else {
        // Setup View for Player
        startPage.style.display = "none";
        joinRoom.style.display = "none";
        waitRoom.style.display = "block"; // "block"
        rocketControl.style.display = "block";
        // Wait for Player to enter his Name
        takeoffButton.addEventListener("click", function () {
            if (nameField.value != "") {
                playerName = nameField.value;
                nameField.readOnly = true;
                nameField.style.boxShadow = "none";
                takeoffButton.style.display = "none";
                // Create Player Object and send to Server
                var player_1 = new Player(query, playerName);
                socket.emit("createPlayer", player_1.data());
            }
            else {
                // If no Name was entered:
                nameField.style.boxShadow = "0px 0px 0px 2px rgb(167, 49, 66)";
            }
            // socket.on("start", (_response: any) => console.log(_response));
        });
        // Give User Feedback about Connection
        socket.on("playerResponse", function (_response) {
            var engineLabel = document.querySelector("#rocketControl .content h2");
            if (_response.success) {
                playerFeedback.innerText = "You are connected to the Game! Wait for your friends to connect xD";
                playerFeedback.style.color = "white";
                engine = _response.engine;
                engineLabel.innerText = engine.toUpperCase() + " Engine";
            }
            else {
                playerFeedback.innerText = "Sorry, there went something wrong connecting to the Game >_<";
                playerFeedback.style.color = "white";
                nameField.style.display = "none";
                takeoffButton.style.display = "none";
            }
        });
        // Show Rocket Control
        socket.on("start", function () {
            slidePageUp(waitRoom);
        });
        // Fire Engine Touch
        fireButton.addEventListener("touchstart", onFire);
        fireButton.addEventListener("touchend", offFire);
        // Fire Engine Click
        fireButton.addEventListener("mousedown", onFire);
        fireButton.addEventListener("mouseup", offFire);
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
    // End Screen
    endScreen = document.getElementById("endScreen");
    messageBox = document.querySelector("#endScreen .content h2");
    restartButton = document.getElementById("restart");
}
function slidePageUp(_page) {
    _page.style.top = -window.innerHeight + "px";
}
function showPlayerCard(_id, _name, _engine) {
    players.innerHTML += "\n    <div class=\"player\" id=\"" + _id + "\">\n      <img src=\"img/rocket-color.png\" alt=\"Rocket-Color\" class=\"mini-rocket\">\n      <div class=\"playerName\">" + _name + "</div>\n      <div class=\"playerControl\">" + _engine.toUpperCase() + " Engine</div>\n    </div>\n  ";
}
function checkForAllPlayers() {
    if (numPlayers >= 1) {
        launchButton.style.display = "block";
    }
    else {
        launchButton.style.display = "none";
    }
}
function onFire(_event) {
    _event.preventDefault();
    socket.emit("fire", {
        engine: engine,
        touched: true
    });
}
function offFire(_event) {
    _event.preventDefault();
    socket.emit("fire", {
        engine: engine,
        touched: false
    });
}
//# sourceMappingURL=main.js.map