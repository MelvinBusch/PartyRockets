class Countdown {
  private number: number;
  private fontSize: number;
  private alpha: number;
  private pos: Vector;
  private text: string;

  constructor(_start: number, _x: number, _y: number) {
    this.pos = new Vector(_x, _y);
    this.number = _start;
    this.text = this.number.toString();

    this.fontSize = 360;
    this.alpha = 1;
  }

  public count(_done: Function): void {
    setTimeout(() => {
      this.number--;
      if (this.number > 0) {
        this.text = this.number.toString();
        this.count(_done);
      } else {
        this.text = "Go!";
        _done();
      }
      this.fontSize = 360;
      this.alpha = 1;
    }, 1000);
  }

  public show(): void {
    ctx.textAlign = "center";
    ctx.font = this.fontSize + "px monospace";
    ctx.textBaseline = "middle";
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.fillText(this.text, this.pos.x, this.pos.y);

    this.fontSize -= 5;
    if (this.fontSize < 5) {
      this.fontSize = 5;
    }

    this.alpha -= .02;
    if (this.alpha < 0) {
      this.alpha = 0;
    }
  }
}
