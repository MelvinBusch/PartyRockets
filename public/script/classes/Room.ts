class Room {

  public id: string;
  public url: string;
  private qrSize: number;

  constructor() {
    this.id = this.generateRoomID();
    // this.url = "http://localhost:3001?room=" + this.id;
    this.url = "http://192.168.2.107:3001?room=" + this.id;
    this.qrSize = 150;
  }

  private generateRoomID(): string {
    return "xxxxxxxx".replace(/[xy]/g, (_c: string) => {
      let r: number = Math.random() * 16 | 0, v: number = _c == "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public async fetchQRCode(): Promise<string> {
    const requestURL: string = `https://chart.googleapis.com/chart?cht=qr&chs=${this.qrSize}x${this.qrSize}&chl=${this.url}&chld=Q|1`;
    let response: Response = await fetch(requestURL);
    return await response.url;
  }

  public data(): any {
    return {
      id: this.id,
      url: this.url
    }
  }
}
