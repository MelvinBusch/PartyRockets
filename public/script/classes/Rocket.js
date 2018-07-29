class Rocket {
    constructor(_x, _y) {
        this.pos = new Vector(_x, _y);
        this.vel = new Vector(0, -.001);
        this.acc = new Vector(0, 0);
        this.maxSpeed = 4;
        this.power = .5;
        this.engines = {
            left: new Vector(this.power, 0),
            center: new Vector(0, -this.power),
            right: new Vector(-this.power, 0)
        };
        this.img = new Image();
        this.img.src = "img/rakete.png";
        this.fuel = 250;
    }
    show() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        let rotation = this.vel.getDirection();
        ctx.scale(.75, .75);
        ctx.rotate(rotation + Math.PI / 2);
        ctx.drawImage(this.img, 0 - this.img.width / 2, 0 - this.img.height);
        ctx.restore();
    }
    update() {
        if (this.checkFuel())
            this.fuel = 0;
        this.updateEngines();
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.multiply(0);
        this.vel.multiply(.9);
    }
    applyForce(_force) {
        this.acc.add(_force);
    }
    updateEngines() {
        let flightDirection = this.vel.getDirection();
        this.engines.left.setDirection(flightDirection + Math.PI / 16);
        this.engines.center.setDirection(flightDirection);
        this.engines.right.setDirection(flightDirection - Math.PI / 16);
    }
    gravity() {
        this.pos.y += 1.5;
    }
    checkFuel() {
        return this.fuel <= 0;
    }
    left() {
        this.applyForce(this.engines.left);
        this.fuel -= .75;
    }
    center() {
        this.applyForce(this.engines.center);
        this.fuel -= .75;
    }
    right() {
        this.applyForce(this.engines.right);
        this.fuel -= .75;
    }
    refuel(_fuel) {
        this.fuel += _fuel;
    }
}
//# sourceMappingURL=Rocket.js.map