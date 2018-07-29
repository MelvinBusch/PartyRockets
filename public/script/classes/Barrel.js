var Barrel = /** @class */ (function () {
    function Barrel() {
        this.pos = this.setRandomPosition();
        this.img = new Image();
        this.img.src = "img/barrel.png";
        this.fuel = Math.random() * 20 + 50;
    }
    Barrel.prototype.setRandomPosition = function () {
        return new Vector(Math.random() * (width * .6) + width * .2, Math.random() * (height * .6) + height * .2);
    };
    Barrel.prototype.show = function () {
        ctx.save();
        ctx.drawImage(this.img, this.pos.x, this.pos.y);
        ctx.restore();
    };
    return Barrel;
}());
//# sourceMappingURL=Barrel.js.map