// Formeln aus der Vorlesung "Mathematische Grundlagen in Gestaltung und Computergrafik" bei Prof. Schneider
var Vector = /** @class */ (function () {
    function Vector(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    Vector.prototype.add = function (_sum) {
        this.x += _sum.x;
        this.y += _sum.y;
    };
    Vector.prototype.multiply = function (_scalar) {
        this.x *= _scalar;
        this.y *= _scalar;
    };
    Vector.prototype.limit = function (_limit) {
        var mag = this.getMagnitude();
        if (mag > _limit) {
            this.setMagnitude(_limit);
        }
    };
    Vector.prototype.getMagnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector.prototype.setMagnitude = function (_magnitude) {
        var direction = this.getDirection();
        this.x = Math.cos(direction) * _magnitude;
        this.y = Math.sin(direction) * _magnitude;
    };
    Vector.prototype.getDirection = function () {
        return Math.atan2(this.y, this.x);
    };
    Vector.prototype.setDirection = function (_direction) {
        var magnitude = this.getMagnitude();
        this.x = Math.cos(_direction) * magnitude;
        this.y = Math.sin(_direction) * magnitude;
    };
    Vector.prototype.copy = function () {
        return new Vector(this.x, this.y);
    };
    return Vector;
}());
//# sourceMappingURL=Vector.js.map