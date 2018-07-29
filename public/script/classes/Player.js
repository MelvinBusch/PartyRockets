var Player = /** @class */ (function () {
    function Player(_room, _name) {
        this.room = _room;
        this.name = _name;
        this.id = this.createUID();
    }
    Player.prototype.createUID = function () {
        return "xxxx".replace(/[xy]/g, function (_c) {
            var r = Math.random() * 16 | 0, v = _c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    Player.prototype.data = function () {
        return {
            id: this.id,
            name: this.name,
            room: this.room
        };
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map