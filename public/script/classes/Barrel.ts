class Barrel {
  public pos: Vector;
  public img: HTMLImageElement;
  public fuel: number;

  constructor() {
    this.pos = this.setRandomPosition();
    this.img = new Image();
    this.img.src = "img/barrel.png";
    this.fuel = Math.random() * 20 + 50;
  }

  private setRandomPosition(): Vector {
    return new Vector(Math.random() * (width * .6) + width * .2, Math.random() * (height * .6) + height * .2);
  }

  public show(): void {
    ctx.save();
    ctx.drawImage(this.img, this.pos.x, this.pos.y);
    ctx.restore();
  }
}
