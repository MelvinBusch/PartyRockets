class Rocket {
    constructor(_x, _y) {
        this.pos = new Vector(_x, _y);
        this.vel = new Vector(0, -.001);
        this.acc = new Vector(0, 0);
        this.maxSpeed = 4;
        this.power = .5;
        this.engines = {
            left: new Vector(-this.power, 0),
            center: new Vector(0, -this.power),
            right: new Vector(this.power, 0)
        };
        this.img = new Image();
        this.img.src = "img/rakete.png";
        this.fuel = 200;
    }
    show() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        let rotation = this.vel.getDirection();
        ctx.rotate(rotation + Math.PI / 2);
        ctx.drawImage(this.img, 0 - this.img.width / 2, 0 - this.img.height);
        ctx.restore();
    }
    update() {
        this.checkFuel();
        this.updateEngines();
        this.edges();
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.multiply(0);
        this.vel.multiply(.95);
    }
    applyForce(_force) {
        this.acc.add(_force);
    }
    updateEngines() {
        let flightDirection = this.vel.getDirection();
        this.engines.left.setDirection(flightDirection - Math.PI / 8);
        this.engines.center.setDirection(flightDirection);
        this.engines.right.setDirection(flightDirection + Math.PI / 8);
    }
    edges() {
        if (this.pos.y < 0 - this.img.height) {
            this.pos.y = height + this.img.height;
        }
        if (this.pos.y > height + this.img.height) {
            this.pos.y = 0 - this.img.height;
        }
        if (this.pos.x > width + this.img.height / 2) {
            this.pos.x = 0 - this.img.height / 2;
        }
        if (this.pos.x < 0 - this.img.height / 2) {
            this.pos.x = width + this.img.height / 2;
        }
    }
    checkFuel() {
        return this.fuel <= 0;
    }
    left() {
        this.applyForce(this.engines.left);
        this.fuel--;
    }
    center() {
        this.applyForce(this.engines.center);
        this.fuel--;
    }
    right() {
        this.applyForce(this.engines.right);
        this.fuel--;
    }
}
//# sourceMappingURL=Rocket.js.map