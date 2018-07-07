///<reference path="../socket/socket.io-client.d.ts" />
// Connecting to Socket
const socketAddress = "http://localhost:3000";
const socket = io.connect(socketAddress);
let startButton;
let startScreen;
let invitationScreen;
let qrContainer;
let rockets;
let launchButton;
window.addEventListener("load", init);
function init() {
    console.info("Anwendung gestartet!");
    startButton = document.getElementById("startBtn");
    startScreen = document.getElementById("startScreen");
    startButton.addEventListener("click", (_event) => {
        startScreen.style.top = -window.innerHeight + "px";
    });
    invitationScreen = document.getElementById("invitationScreen");
    qrContainer = document.getElementById("qrContainer");
    rockets = document.getElementsByClassName("mini-rocket");
    launchButton = document.getElementById("launchBtn");
    console.log(launchButton);
    // Create Room with Room ID
    let room = new Room();
    // Load QR Code from GoogleCharts via GET Request
    let qrSize = 170;
    const requestURL = `https://chart.googleapis.com/chart?cht=qr&chs=${qrSize}x${qrSize}&chl=${room.roomID}&chld=H|1`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", requestURL, true);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            let qr = document.createElement("img");
            qr.setAttribute("src", xhr.responseURL);
            qrContainer.appendChild(qr);
        }
    };
    // Let players join Room
    document.addEventListener("keypress", (_event) => {
        if (_event.key === "a") {
            room.addPlayer();
            rockets[room.players - 1].setAttribute("src", "img/icons/rocket-color.png");
            if (room.players > 0) {
                launchButton.style.display = "inline";
            }
        }
    });
    launchButton.addEventListener("click", startGame);
    // TODO: Handle Player Quitting
    // Start Game
    setup();
}
function startGame(_event) {
    invitationScreen.style.display = "none";
    setup();
}
//# sourceMappingURL=main.js.map