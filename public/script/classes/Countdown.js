class Countdown {
    constructor(_start) {
        this.number = _start;
    }
    count() {
        setTimeout(() => {
            this.number--;
            if (this.number >= 0)
                this.count();
        }, 1000);
    }
    draw() {
        console.log(this.number);
    }
}
//# sourceMappingURL=Countdown.js.map