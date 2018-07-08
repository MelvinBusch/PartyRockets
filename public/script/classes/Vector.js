class Vector {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    add(_sum) {
        this.x += _sum.x;
        this.y += _sum.y;
    }
    multiply(_scalar) {
        this.x *= _scalar;
        this.y *= _scalar;
    }
    getDirection() {
        return Math.atan2(this.y, this.x);
    }
    limit(_limit) {
        let mag = this.getMagnitude();
        if (mag > _limit) {
            this.setMagnitude(_limit);
        }
    }
    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    setMagnitude(_magnitude) {
        let direction = this.getDirection();
        this.x = Math.cos(direction) * _magnitude;
        this.y = Math.sin(direction) * _magnitude;
    }
    setDirection(_direction) {
        let magnitude = this.getMagnitude();
        this.x = Math.cos(_direction) * magnitude;
        this.y = Math.sin(_direction) * magnitude;
    }
}
//# sourceMappingURL=Vector.js.map