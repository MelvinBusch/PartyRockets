class Room {
  public roomID: string;
  private maxPlayers: number;
  public players: number;

  constructor() {
    this.roomID = this.generateRoomID();
    this.maxPlayers = 3;
    this.players = 0;
  }

  public addPlayer(): void {
    this.players++;
    if (this.players > this.maxPlayers) {
      this.players = this.maxPlayers;
    }
  }

  public removePlayer(): void {
    this.players--;
    if (this.players < 0) {
      this.players = 0;
    }
  }

  private generateRoomID(): string {
    return "xxxxxxxx".replace(/[xy]/g, (_c: string) => {
      let r: number = Math.random() * 16 | 0, v = _c == "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
