class Rocket {

  public pos: Vector;
  private vel: Vector;
  private acc: Vector;
  private maxSpeed: number;

  private power: number;
  private engines: Engine;

  public img: HTMLImageElement;
  public fuel: number;

  constructor(_x: number, _y: number) {
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

  public show(): void {
    ctx.save();

    ctx.translate(this.pos.x, this.pos.y);
    let rotation: number = this.vel.getDirection();
    ctx.scale(.75, .75);
    ctx.rotate(rotation + Math.PI / 2);
    ctx.drawImage(this.img, 0 - this.img.width / 2, 0 - this.img.height);
    ctx.restore();
  }

  public update(): void {
    if (this.checkFuel())
      this.fuel = 0;

    this.updateEngines();

    this.vel.limit(this.maxSpeed);

    this.pos.add(this.vel);
    this.vel.add(this.acc);

    this.acc.multiply(0);
    this.vel.multiply(.9);
  }

  private applyForce(_force: Vector): void {
    this.acc.add(_force);
  }

  private updateEngines(): void {
    let flightDirection = this.vel.getDirection();
    this.engines.left.setDirection(flightDirection + Math.PI / 16);
    this.engines.center.setDirection(flightDirection);
    this.engines.right.setDirection(flightDirection - Math.PI / 16);
  }

  public gravity(): void {
    this.pos.y += 1.5;
  }

  private checkFuel(): boolean {
    return this.fuel <= 0;
  }

  public left(): void {
    this.applyForce(this.engines.left);
    this.fuel -= .75;
  }

  public center(): void {
    this.applyForce(this.engines.center);
    this.fuel -= .75;
  }

  public right(): void {
    this.applyForce(this.engines.right);
    this.fuel -= .75;
  }

  public refuel(_fuel): void {
    this.fuel += _fuel;
  }
}

interface Engine {
  left: Vector,
  center: Vector,
  right: Vector
}
