var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Room {
    constructor() {
        this.roomID = this.generateRoomID();
        this.roomURL = "http://localhost:3000?room=" + this.roomID;
        this.maxPlayers = 3;
        this.players = 0;
        this.qrSize = 200;
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
    generateQRCode() {
        return __awaiter(this, void 0, void 0, function* () {
            const requestURL = `https://chart.googleapis.com/chart?cht=qr&chs=${this.qrSize}x${this.qrSize}&chl=${this.roomURL}&chld=H|2`;
            let response = yield fetch(requestURL);
            let imgURL = yield response.url;
            return imgURL;
        });
    }
}
//# sourceMappingURL=Room.js.map