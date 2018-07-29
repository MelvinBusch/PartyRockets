var Base = /** @class */ (function () {
    function Base() {
        this.height = 70;
        this.pos = new Vector(40, height - this.height);
    }
    Base.prototype.show = function () {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, 200, this.height);
        ctx.restore();
    };
    return Base;
}());
//# sourceMappingURL=Base.js.map