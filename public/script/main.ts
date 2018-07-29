///<reference path="../socket/socket.io-client.d.ts" />

// Connecting to Socket
// const socketAddress: string = "http://localhost:3000";
const socketAddress: string = "http://192.168.2.107:3001";
const socket: SocketIOClient.Socket = io.connect(socketAddress);

let room: Room;
let player: Player;
let numPlayers: number = 0;
let engine: string = "";

// Start Page
let startPage: HTMLElement;

// Join Room
let joinRoom: HTMLElement;
let qrCode: HTMLImageElement;
let qrLink: HTMLLinkElement;
let players: HTMLElement;
let launchButton: HTMLButtonElement;

// Wait Room
let waitRoom: HTMLElement;
let nameField: HTMLInputElement;
let takeoffButton: HTMLButtonElement;
let playerFeedback: HTMLElement;
let playerName: string;

// Rocket Controll
let rocketControl: HTMLElement;
let fireButton: HTMLElement;

// End Screen
let endScreen: HTMLElement;
let messageBox: HTMLHeadingElement;
let restartButton: HTMLButtonElement;

window.addEventListener("load", init);

function init(): void {

  console.info("Anwendung gestartet!");
  initDOMVariables();

  // Parse URL
  let pageURL: string = window.location.search;
  let query: string = pageURL.replace("?room=", "");
  console.log(window.location.search);

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
    socket.on("masterResponse", (_response: any) => {
      if (_response.success) {
        showPlayerCard(_response.id, _response.name, _response.engine);
        numPlayers++;
        checkForAllPlayers();
      }
    });

    // Handle unexpected disconnect
    socket.on("playerDisconnect", (_playerID: string) => {
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
    socket.on("start", (_room) => {
      slidePageUp(joinRoom);
    });

    // Restart Game
    socket.on("restart", (_message: any) => {
      messageBox.innerText = _message.message
      setTimeout(() => {
        endScreen.style.top = "0";
        endScreen.style.display = "block";
      }, 1000);
    });
    restartButton.addEventListener("click", () => {
      setup();
      slidePageUp(endScreen);
    });

  } else {

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

      } else {
        // If no Name was entered:
        nameField.style.boxShadow = "0px 0px 0px 2px rgb(167, 49, 66)";
      }
      // socket.on("start", (_response: any) => console.log(_response));
    });

    // Give User Feedback about Connection
    socket.on("playerResponse", (_response: any) => {
      let engineLabel: HTMLElement = document.querySelector("#rocketControl .content h2");
      if (_response.success) {
        playerFeedback.innerText = "You are connected to the Game! Wait for your friends to connect xD";
        playerFeedback.style.color = "white";
        engine = _response.engine;
        engineLabel.innerText = engine.toUpperCase() + " Engine";
      } else {
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

    // Fire Engine Touch
    fireButton.addEventListener("touchstart", onFire);
    fireButton.addEventListener("touchend", offFire);

    // Fire Engine Click
    fireButton.addEventListener("mousedown", onFire);
    fireButton.addEventListener("mouseup", offFire);
  }
}

function initDOMVariables(): void {
  // Start Page
  startPage = document.getElementById("startPage");

  // Join Room
  joinRoom = document.getElementById("joinRoom");
  qrCode = <HTMLImageElement>document.getElementById("qrCode");
  qrLink = <HTMLLinkElement>document.getElementById("qrLink");
  players = <HTMLElement>document.getElementById("players");
  launchButton = <HTMLButtonElement>document.getElementById("launchBtn");

  // Wait Room
  waitRoom = document.getElementById("waitRoom");
  nameField = <HTMLInputElement>document.getElementById("nameField");
  takeoffButton = <HTMLButtonElement>document.getElementById("takeoffButton");
  playerFeedback = document.getElementById("playerFeedback");

  // Rocket Controll
  rocketControl = document.getElementById("rocketControl");
  fireButton = document.getElementById("fireButton");

  // End Screen
  endScreen = document.getElementById("endScreen");
  messageBox = document.querySelector("#endScreen .content h2");
  restartButton = <HTMLButtonElement>document.getElementById("restart");
}

function slidePageUp(_page: HTMLElement): void {
  _page.style.top = -window.innerHeight + "px";
}

function showPlayerCard(_id: string, _name: string, _engine: string): void {
  players.innerHTML += `
    <div class="player" id="${_id}">
      <img src="img/rocket-color.png" alt="Rocket-Color" class="mini-rocket">
      <div class="playerName">${_name}</div>
      <div class="playerControl">${_engine.toUpperCase()} Engine</div>
    </div>
  `
}

function checkForAllPlayers(): void {
  if (numPlayers >= 1) {
    launchButton.style.display = "block";
  } else {
    launchButton.style.display = "none";
  }
}

function onFire(_event: Event): void {
  _event.preventDefault();
  socket.emit("fire", {
    engine: engine,
    touched: true
  });
}

function offFire(_event: Event): void {
  _event.preventDefault();
  socket.emit("fire", {
    engine: engine,
    touched: false
  });
}
