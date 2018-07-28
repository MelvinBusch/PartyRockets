class Countdown {
  private number: number;
  private fontSize: number;

  constructor(_start: number) {
    this.number = _start;
  }

  public count(): void {
    setTimeout(() => {
      this.number--;
      if (this.number >= 0)
        this.count();
    }, 1000);
  }

  public draw(): void {
    console.log(this.number);
  }
}
