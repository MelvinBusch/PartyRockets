"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var SocketIO = require("socket.io");
var Url = require("url");
var Server;
(function (Server) {
    var rooms = {};
    // Setting up Express Server
    var app = Express();
    var server = app.listen(process.env.PORT || 3001, function () { return console.log("Server has started"); });
    app.use(Express.static(__dirname + "/public"));
    // Setting up Socket Connection
    var socket = SocketIO(server);
    socket.on("connection", function (_socket) {
        // Get new Room Data and save to Array
        _socket.on("createRoom", function (_data) {
            var room = {
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
        _socket.on("createPlayer", function (_player) {
            var success = false;
            var room = rooms[_player.room];
            var numPlayers = Object.keys(room.players).length + 1;
            var engine = "";
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
        _socket.on("ready", function (_room) {
            socket.emit("start", _room);
        });
        // Rocket Control
        _socket.on("fire", function (_player) {
            socket.emit(_player.engine, _player.touched);
        });
        // Game Over
        _socket.on("gameOver", function (_message) { return socket.emit("restart", _message); });
        // Handle disconnects
        _socket.on("disconnect", function () {
            var query = Url.parse(_socket.handshake.headers.referer).query;
            // Delete Room if closed
            if (!query) {
                for (var _key in rooms) {
                    var room_1 = rooms[_key];
                    if (room_1.socket == _socket.id) {
                        delete rooms[_key];
                    }
                }
            }
            // Remove Player from room on disconnect
            if (query) {
                for (var _key in rooms) {
                    var room_2 = rooms[_key];
                    for (var _id in room_2.players) {
                        var player_1 = room_2.players[_id];
                        if (player_1.socket === _socket.id && player_1 != undefined) {
                            room_2.engines.push(player_1.engine);
                            socket.emit("playerDisconnect", player_1.id);
                            delete rooms[_key].players[_id];
                        }
                    }
                }
            }
        });
    });
})(Server || (Server = {}));
//# sourceMappingURL=server.js.map