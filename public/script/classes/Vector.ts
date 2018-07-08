class Vector {

  public x: number;
  public y: number;

  constructor(_x: number, _y: number) {
    this.x = _x;
    this.y = _y;
  }

  public add(_sum: Vector): void {
    this.x += _sum.x;
    this.y += _sum.y;
  }

  public multiply(_scalar: number): void {
    this.x *= _scalar;
    this.y *= _scalar;
  }

  public getDirection(): number {
    return Math.atan2(this.y, this.x);
  }

  public limit(_limit: number): void {
    let mag: number = this.getMagnitude();
    if (mag > _limit) {
      this.setMagnitude(_limit);
    }
  }

  private getMagnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  private setMagnitude(_magnitude): void {
    let direction = this.getDirection();
    this.x = Math.cos(direction) * _magnitude;
    this.y = Math.sin(direction) * _magnitude;
  }

  private setDirection(_direction) {
    let magnitude = this.getMagnitude();
    this.x = Math.cos(_direction) * magnitude;
    this.y = Math.sin(_direction) * magnitude;
  }
}
