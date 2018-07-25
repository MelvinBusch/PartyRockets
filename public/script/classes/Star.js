class Star {
    constructor() {
        this.setRandomPosition();
        this.size = Math.random() * 2 + 1;
    }
    setRandomPosition() {
        this.pos = new Vector(Math.random() * width, Math.random() * height);
    }
    show() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "rgb(242, 242, 242)";
        ctx.fill();
    }
}
//# sourceMappingURL=Star.js.map