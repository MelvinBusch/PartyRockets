class Room {
    constructor() {
        this.roomID = this.generateRoomID();
        this.maxPlayers = 3;
        this.players = 0;
    }
    addPlayer() {
        this.players++;
        if (this.players > this.maxPlayers) {
            this.players = this.maxPlayers;
        }
    }
    removePlayer() {
        this.players--;
        if (this.players < 0) {
            this.players = 0;
        }
    }
    generateRoomID() {
        return "xxxxxxxx".replace(/[xy]/g, (_c) => {
            let r = Math.random() * 16 | 0, v = _c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
//# sourceMappingURL=Room.js.map