class Moon {
    constructor(_x, _y) {
        this.pos = new Vector(_x, _y);
        this.img = new Image();
        this.img.src = "img/moon.png";
    }
    show() {
        ctx.drawImage(this.img, this.pos.x - this.img.width / 2, this.pos.y - this.img.height / 2);
    }
}
//# sourceMappingURL=Moon.js.map