class Rocket {

  private pos: Vector;
  private vel: Vector;
  private acc: Vector;
  private maxSpeed: number;

  private engineStrength: number;
  private engineLeft: Vector;
  private engineCenter: Vector;
  private engineRight: Vector;

  private gravity: Vector;
  private airResistance: Vector;
  private img: HTMLImageElement;

  private pressed: boolean = false;

  constructor(_x: number, _y: number) {
    this.pos = new Vector(_x, _y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.maxSpeed = 10;

    this.engineStrength = .4;
    this.engineLeft = new Vector(this.engineStrength, -this.engineStrength);
    this.engineCenter = new Vector(0, -this.engineStrength);
    this.engineRight = new Vector(-this.engineStrength, -this.engineStrength);

    this.gravity = new Vector(0, .1);
    this.airResistance = new Vector(0, -.1);

    this.img = new Image();
    this.img.src = "img/rakete.png";
    console.log(this.img);

    document.addEventListener("keypress", () => this.pressed = true);
    document.addEventListener("keyup", () => this.pressed = false);
  }

  public show(): void {
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.drawImage(this.img, this.pos.x - this.img.width / 2, this.pos.y - this.img.height / 2);
  }

  public update(): void {
    this.behaviors();
    this.edges();
    this.vel.limit(this.maxSpeed);

    console.log(this.vel);

    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.multiply(0);
  }

  private applyForce(_force: Vector): void {
    this.acc.add(_force);
  }

  private behaviors(): void {
    this.applyForce(this.gravity);
    //this.applyForce(this.airResistance);

    if (this.pressed) {
      this.applyForce(this.engineCenter);
    }
  }

  private edges(): void {
    if (this.pos.y < 0 - this.img.height / 2) {
      this.pos.y = height + this.img.height / 2;
    }
    if (this.pos.y > height + this.img.height / 2) {
      this.pos.y = 0 - this.img.height / 2;
    }
    if (this.pos.x > width + this.img.width / 2) {
      this.pos.x = 0 - this.img.width / 2;
    }
    if (this.pos.x < 0 - this.img.width / 2) {
      this.pos.x = width + this.img.width / 2;
    }
  }
}
