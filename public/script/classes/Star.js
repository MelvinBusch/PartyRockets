var Star = /** @class */ (function () {
    function Star() {
        this.setRandomPosition();
        this.size = Math.random() * 2 + 1;
    }
    Star.prototype.setRandomPosition = function () {
        this.pos = new Vector(Math.random() * width, Math.random() * height);
    };
    Star.prototype.show = function () {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "rgb(242, 242, 242)";
        ctx.fill();
    };
    return Star;
}());
//# sourceMappingURL=Star.js.map