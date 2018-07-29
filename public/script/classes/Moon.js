var Moon = /** @class */ (function () {
    function Moon(_x, _y) {
        this.pos = new Vector(_x, _y);
        this.img = new Image();
        this.img.src = "img/moon.png";
    }
    Moon.prototype.show = function () {
        ctx.drawImage(this.img, this.pos.x - this.img.width / 2, this.pos.y - this.img.height / 2);
    };
    return Moon;
}());
//# sourceMappingURL=Moon.js.map