class Player {
    constructor(_room, _name) {
        this.room = _room;
        this.name = _name;
        this.id = this.createUID();
    }
    createUID() {
        return "xxxx".replace(/[xy]/g, (_c) => {
            let r = Math.random() * 16 | 0, v = _c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    data() {
        return {
            id: this.id,
            name: this.name,
            room: this.room
        };
    }
}
//# sourceMappingURL=Player.js.map