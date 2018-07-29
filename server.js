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
                engines: ["left", "center", "right"],
                socket: _socket.id
            };
            rooms[room.id] = room;
        });
        // Get new Player Data and save to according Room
        _socket.on("createPlayer", (_player) => {
            let success = false;
            let room = rooms[_player.room];
            let numPlayers = Object.keys(room.players).length + 1;
            let engine = "";
            if (room && numPlayers <= 3) {
                // Assign Engine to Player
                engine = room.engines[0];
                room.engines.splice(0, 1);
                // Assign Player to Room
                room.players[_player.id] = {
                    id: _player.id,
                    name: _player.name,
                    room: _player.room,
                    socket: _socket.id,
                    engine: engine
                };
                success = true;
            }
            // Give Feedback to the User
            _socket.emit("playerResponse", {
                success: success,
                id: _player.id,
                name: _player.name,
                engine: engine
            });
            socket.emit("masterResponse", {
                success: success,
                id: _player.id,
                name: _player.name,
                engine: engine
            });
        });
        // Game Start
        _socket.on("ready", (_room) => {
            socket.emit("start", _room);
        });
        // Rocket Control
        _socket.on("fire", (_player) => {
            socket.emit(_player.engine, _player.touched);
        });
        // Game Over
        _socket.on("gameOver", (_message) => socket.emit("restart", _message));
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
            }
            // Remove Player from room on disconnect
            if (query) {
                for (let _key in rooms) {
                    let room = rooms[_key];
                    for (let _id in room.players) {
                        let player = room.players[_id];
                        if (player.socket === _socket.id && player != undefined) {
                            room.engines.push(player.engine);
                            socket.emit("playerDisconnect", player.id);
                            delete rooms[_key].players[_id];
                        }
                    }
                }
            }
        });
    });
})(Server || (Server = {}));
//# sourceMappingURL=server.js.map