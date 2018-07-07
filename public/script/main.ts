///<reference path="../socket/socket.io-client.d.ts" />

// Connecting to Socket
const socketAddress: string = "http://localhost:3000";
const socket: SocketIOClient.Socket = io.connect(socketAddress);

let startButton: HTMLButtonElement;
let startScreen: HTMLElement;

let invitationScreen: HTMLElement;
let qrContainer: HTMLElement;
let rockets: HTMLCollection;
let launchButton: HTMLButtonElement;

window.addEventListener("load", init);

function init(): void {
  console.info("Anwendung gestartet!");

  startButton = <HTMLButtonElement>document.getElementById("startBtn");
  startScreen = document.getElementById("startScreen");
  startButton.addEventListener("click", (_event: MouseEvent) => {
    startScreen.style.top = -window.innerHeight + "px";
  });

  invitationScreen = document.getElementById("invitationScreen");
  qrContainer = document.getElementById("qrContainer");
  rockets = document.getElementsByClassName("mini-rocket");
  launchButton = <HTMLButtonElement>document.getElementById("launchBtn");
  console.log(launchButton);

  // Create Room with Room ID
  let room: Room = new Room();

  // Load QR Code from GoogleCharts via GET Request
  let qrSize: number = 170;
  const requestURL: string = `https://chart.googleapis.com/chart?cht=qr&chs=${qrSize}x${qrSize}&chl=${room.roomID}&chld=H|1`;
  const xhr: XMLHttpRequest = new XMLHttpRequest();
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
  document.addEventListener("keypress", (_event: KeyboardEvent) => {
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

function startGame(_event: MouseEvent) {
  invitationScreen.style.display = "none";
  setup();
}
