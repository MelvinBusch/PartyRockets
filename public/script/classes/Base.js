class Base {
    constructor() {
        this.pos = new Vector(40, height - 40);
    }
    show() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, 200, 40);
        ctx.restore();
    }
}
//# sourceMappingURL=Base.js.map