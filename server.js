"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const SocketIO = require("socket.io");
const Url = require("url");
var Server;
(function (Server) {
    let rooms = {};
    // Setting up Express Server
    const app = Express();
    const server = app.listen(process.env.PORT || 3001, () => console.log("Server has started"));
    app.use(Express.static(__dirname + "/public"));
    // Setting up Socket Connection
    const socket = SocketIO(server);
    socket.on("connection", (_socket) => {
        // Get new Room Data and save to Array
        _socket.on("createRoom", (_data) => {
            let room = {
                id: _data.id,
                url: _data.url,
                playerLimit: 3,
                players: {},
                socket: _socket.id
            };
            rooms[room.id] = room;
            console.log(rooms);
        });
        // Get new Player Data and save to according Room
        _socket.on("createPlayer", (_player) => {
            let success = false;
            console.log("new Player connected!");
            for (let _key in rooms) {
                let room = rooms[_key];
                if (room.id === _player.room && Object.keys(room.players).length <= 2) {
                    room.players[_player.id] = {
                        id: _player.id,
                        name: _player.name,
                        room: _player.room,
                        socket: _socket.id,
                        engine: "center"
                    };
                    success = true;
                }
            }
            // Give Feedback to the User
            _socket.emit("playerResponse", success);
            console.log(rooms);
        });
        // Handle disconnects
        _socket.on("disconnect", () => {
            let query = Url.parse(_socket.handshake.headers.referer).query;
            // Delete Room if closed
            if (!query) {
                for (let _key in rooms) {
                    let room = rooms[_key];
                    if (room.socket == _socket.id) {
                        delete rooms[_key];
                    }
                }
                console.info("Room closed!");
            }
            else {
                // Remove Player from room on disconnect
                for (let _key in rooms) {
                    let room = rooms[_key];
                    for (let _id in room.players) {
                        let player = room.players[_id];
                        if (player.socket === _socket.id && player != undefined) {
                            delete rooms[_key].players[_id];
                        }
                    }
                }
                console.info("Player disconnected!");
            }
        });
    });
})(Server || (Server = {}));
// User fires Engine
// 1. Destinate Room
// 2. Send Data to Room
// app.get("/", (_request: Express.Request, _response: Express.Response, _next: Express.NextFunction) => {
//   const query: string = _request.query.room;
//   if (_request.query.room) {
//     _response.redirect("player?" + query);
//     _response.end();
//   } else {
//     app.use(Express.static(__dirname + "/public"));
//   }
//   _next();
// });
//# sourceMappingURL=server.js.map