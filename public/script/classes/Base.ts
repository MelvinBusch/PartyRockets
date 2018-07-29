class Base {

  private pos: Vector;
  private height: number = 70;

  constructor() {
    this.pos = new Vector(40, height - this.height);
  }

  public show(): void {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 200, this.height);
    ctx.restore();
  }
}
