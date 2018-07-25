class Player {

  public id: string;
  public room: string;
  public name: string

  constructor(_room: string, _name: string) {
    this.room = _room;
    this.name = _name;
    this.id = this.createUID();
  }

  private createUID(): string {
    return "xxxx".replace(/[xy]/g, (_c: string) => {
      let r: number = Math.random() * 16 | 0, v: number = _c == "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public data(): any {
    return {
      id: this.id,
      name: this.name,
      room: this.room
    }
  }
}
