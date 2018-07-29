class Moon {

  public pos: Vector;
  public img: HTMLImageElement;

  constructor(_x: number, _y: number) {
    this.pos = new Vector(_x, _y);
    this.img = new Image();
    this.img.src = "img/moon.png";
  }

  public show(): void {
    ctx.drawImage(this.img, this.pos.x - this.img.width / 2, this.pos.y - this.img.height / 2);
  }
}
