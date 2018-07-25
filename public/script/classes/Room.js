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
        this.id = this.generateRoomID();
        // this.url = "http://localhost:3001?room=" + this.id;
        this.url = "http://192.168.2.107:3001?room=" + this.id;
        this.qrSize = 150;
    }
    generateRoomID() {
        return "xxxxxxxx".replace(/[xy]/g, (_c) => {
            let r = Math.random() * 16 | 0, v = _c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    fetchQRCode() {
        return __awaiter(this, void 0, void 0, function* () {
            const requestURL = `https://chart.googleapis.com/chart?cht=qr&chs=${this.qrSize}x${this.qrSize}&chl=${this.url}&chld=Q|1`;
            let response = yield fetch(requestURL);
            return yield response.url;
        });
    }
    data() {
        return {
            id: this.id,
            url: this.url
        };
    }
}
//# sourceMappingURL=Room.js.map