///<reference path="../socket/socket.io-client.d.ts" />

// Connecting to Socket
const socketAddress: string = "http://localhost:3000";
const socket: SocketIOClient.Socket = io.connect(socketAddress);

let qrCode: HTMLImageElement;
let qrAltLink: HTMLLinkElement;
let rockets: HTMLCollection;
let startButton: HTMLButtonElement;

let room: Room;
let rooms: Room[] = [];

window.addEventListener("load", init);

function init(): void {
  console.info("Anwendung gestartet!");

  // Parse URL
  let pageURL: string = window.location.search;
  let roomID: string = pageURL.replace("?room=", "");

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
  } else {
    console.log("Join Room!");
    socket.emit("newPlayer", roomID);
  }
}

function initGameMenu(): void {
  qrCode = <HTMLImageElement>document.getElementById("qrCode");
  qrAltLink = <HTMLLinkElement>document.getElementById("qrAltLink");
  rockets = document.getElementsByClassName("mini-rocket");
  startButton = <HTMLButtonElement>document.getElementById("launchBtn");
}

function slidePageUp(_page: string) {
  let page: HTMLElement = document.getElementById(_page);
  page.style.top = -window.innerHeight + "px";
}
