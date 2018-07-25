class Star {

  private pos: Vector;
  private size: number;

  constructor() {
    this.setRandomPosition();
    this.size = Math.random() * 2 + 1;
  }

  private setRandomPosition(): void {
    this.pos = new Vector(Math.random() * width, Math.random() * height);
  }

  public show(): void {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "rgb(242, 242, 242)";
    ctx.fill();
  }
}
