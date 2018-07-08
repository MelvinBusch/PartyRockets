class Room {

  private roomID: string;
  public roomURL: string;
  private maxPlayers: number;
  public players: number;
  private qrSize: number;

  constructor() {
    this.roomID = this.generateRoomID();
    this.roomURL = "http://localhost:3000?room=" + this.roomID;
    this.maxPlayers = 3;
    this.players = 0;
    this.qrSize = 200;
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

  public async generateQRCode(): Promise<void> {
    const requestURL: string = `https://chart.googleapis.com/chart?cht=qr&chs=${this.qrSize}x${this.qrSize}&chl=${this.roomURL}&chld=H|2`;
    let response: Response = await fetch(requestURL);
    let imgURL: any = await response.url;

    return imgURL;
  }
}
