class Smoke {

  private pos: Vector;
  private vel: Vector;
  private acc: Vector;

  private lifetime: number;
  private r: number;
  private gravity: Vector;

  constructor(_x: number, _y: number) {
    this.pos = new Vector(_x, _y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);

    this.lifetime = 1000;
    this.r = 4;
    this.gravity = new Vector(0, 1);
  }

  public show(): void {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(242, 242, 242, 50)";
    ctx.fill();
    ctx.closePath();
  }

  public update(): void {
    this.applyForce(this.gravity);

    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.multiply(0);

    this.lifetime--;
  }

  private applyForce(_force: Vector): void {
    this.acc.add(_force);
  }

  public done(): boolean {
    return this.lifetime < 0;
  }
}
