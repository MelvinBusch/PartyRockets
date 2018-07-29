import * as Express from "express";
import * as SocketIO from "socket.io";
import * as Url from "url";

namespace Server {

  let rooms: Rooms = {};

  // Setting up Express Server
  const app: Express.Application = Express();
  const server: any = app.listen(process.env.PORT || 3001, () => console.log("Server has started"));
  app.use(Express.static(__dirname + "/public"));

  // Setting up Socket Connection
  const socket: SocketIO.Server = SocketIO(server);

  socket.on("connection", (_socket: SocketIO.Socket) => {

    // Get new Room Data and save to Array
    _socket.on("createRoom", (_data: any) => {
      let room: Room = {
        id: _data.id,
        url: _data.url,
        playerLimit: 3,
        players: {},
        engines: ["left", "center", "right"],
        socket: _socket.id
      }
      rooms[room.id] = room;
    });

    // Get new Player Data and save to according Room
    _socket.on("createPlayer", (_player: any) => {
      let success: boolean = false;

      let room: Room = rooms[_player.room];
      let numPlayers: number = Object.keys(room.players).length + 1;
      let engine: string = "";

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
        }
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
    _socket.on("ready", (_room: any) => {
      socket.emit("start", _room);
    });

    // Rocket Control
    _socket.on("fire", (_player: any) => {
      socket.emit(_player.engine, _player.touched);
    });

    // Game Over
    _socket.on("gameOver", (_message: any) => socket.emit("restart", _message));

    // Handle disconnects
    _socket.on("disconnect", () => {
      let query: string = Url.parse(_socket.handshake.headers.referer).query;

      // Delete Room if closed
      if (!query) {
        for (let _key in rooms) {
          let room: Room = rooms[_key];
          if (room.socket == _socket.id) {
            delete rooms[_key];
          }
        }
      }

      // Remove Player from room on disconnect
      if (query) {
        for (let _key in rooms) {
          let room: Room = rooms[_key];
          for (let _id in room.players) {
            let player: Player = room.players[_id];
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

  interface Player {
    id: string,
    name: string,
    room: string,
    socket: string,
    engine: string
  }

  interface Players {
    [id: string]: Player
  }

  interface Room {
    id: string,
    url: string,
    playerLimit: number,
    players: Players,
    engines: string[],
    socket: string
  }

  interface Rooms {
    [id: string]: Room
  }
}
