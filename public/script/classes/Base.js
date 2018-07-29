class Base {
    constructor() {
        this.height = 70;
        this.pos = new Vector(40, height - this.height);
    }
    show() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, 200, this.height);
        ctx.restore();
    }
}
//# sourceMappingURL=Base.js.map