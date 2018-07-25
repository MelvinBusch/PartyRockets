class Rocket {

  private pos: Vector;
  private vel: Vector;
  private acc: Vector;
  private maxSpeed: number;

  private power: number;
  private engines: Engine;

  private img: HTMLImageElement;
  public fuel: number;

  constructor(_x: number, _y: number) {
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

  public show(): void {
    ctx.save();

    ctx.translate(this.pos.x, this.pos.y);
    let rotation: number = this.vel.getDirection();
    ctx.rotate(rotation + Math.PI / 2);
    ctx.drawImage(this.img, 0 - this.img.width / 2, 0 - this.img.height);

    ctx.restore();
  }

  public update(): void {
    this.checkFuel();
    this.updateEngines();
    this.edges();

    this.vel.limit(this.maxSpeed);

    this.pos.add(this.vel);
    this.vel.add(this.acc);

    this.acc.multiply(0);
    this.vel.multiply(.95);
  }

  private applyForce(_force: Vector): void {
    this.acc.add(_force);
  }

  private updateEngines(): void {
    let flightDirection = this.vel.getDirection();
    this.engines.left.setDirection(flightDirection - Math.PI / 8);
    this.engines.center.setDirection(flightDirection);
    this.engines.right.setDirection(flightDirection + Math.PI / 8);
  }

  private edges(): void {
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

  private checkFuel(): boolean {
    return this.fuel <= 0;
  }

  public left(): void {
    this.applyForce(this.engines.left);
    this.fuel--;
  }

  public center(): void {
    this.applyForce(this.engines.center);
    this.fuel--;
  }

  public right(): void {
    this.applyForce(this.engines.right);
    this.fuel--;
  }
}

interface Engine {
  left: Vector,
  center: Vector,
  right: Vector
}
