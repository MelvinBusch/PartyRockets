class Smoke {
    constructor(_x, _y) {
        this.pos = new Vector(_x, _y);
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.lifetime = 1000;
        this.r = 4;
        this.gravity = new Vector(0, 1);
    }
    show() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(242, 242, 242, 50)";
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.applyForce(this.gravity);
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.multiply(0);
        this.lifetime--;
    }
    applyForce(_force) {
        this.acc.add(_force);
    }
    done() {
        return this.lifetime < 0;
    }
}
//# sourceMappingURL=Smoke.js.map