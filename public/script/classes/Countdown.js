var Countdown = /** @class */ (function () {
    function Countdown(_start, _x, _y) {
        this.pos = new Vector(_x, _y);
        this.number = _start;
        this.text = this.number.toString();
        this.fontSize = 360;
        this.alpha = 1;
    }
    Countdown.prototype.count = function (_done) {
        var _this = this;
        setTimeout(function () {
            _this.number--;
            if (_this.number > 0) {
                _this.text = _this.number.toString();
                _this.count(_done);
            }
            else {
                _this.text = "Go!";
                _done();
            }
            _this.fontSize = 360;
            _this.alpha = 1;
        }, 1000);
    };
    Countdown.prototype.show = function () {
        ctx.textAlign = "center";
        ctx.font = this.fontSize + "px monospace";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
        ctx.fillText(this.text, this.pos.x, this.pos.y);
        this.fontSize -= 5;
        if (this.fontSize < 5) {
            this.fontSize = 5;
        }
        this.alpha -= .02;
        if (this.alpha < 0) {
            this.alpha = 0;
        }
    };
    return Countdown;
}());
//# sourceMappingURL=Countdown.js.map