let ctx;
let width;
let height;
let staticBackground;
let base;
let stars = [];
let moon;
let rocket;
let left = false;
let center = false;
let right = false;
let touched;
function setup() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    getKeyStates();
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.strokeStyle = "none";
    ctx.fillStyle = "rgb(35, 36, 38)";
    ctx.fillRect(0, 0, width, height);
    staticBackground = ctx.getImageData(0, 0, width, height);
    // Rakete
    rocket = new Rocket(140, height - 40);
    // Base
    base = new Base();
    // Mond
    moon = new Moon(Math.floor(width * .8), Math.floor(height * .3));
    // Sterne
    for (let i = 0; i < 100; i++) {
        stars.push(new Star());
    }
    window.requestAnimationFrame(draw);
}
function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(staticBackground, 0, 0);
    // Sterne
    stars.forEach(star => star.show());
    // Treibstoffanzeige
    ctx.fillStyle = "rgb(98, 170, 189)"; // hellblau
    ctx.fillRect(50, 30, rocket.fuel, 15);
    ctx.font = "14px monospace";
    ctx.fillText("Fuel", 50, 60);
    // Base
    base.show();
    // Mond
    moon.show();
    // Rakete
    rocket.show();
    rocket.update();
    socket.on("left", () => {
        rocket.left();
    });
    socket.on("center", () => {
        rocket.center();
    });
    socket.on("right", () => {
        rocket.right();
    });
    if (left) {
        rocket.left();
    }
    if (center) {
        rocket.center();
    }
    if (right) {
        rocket.right();
    }
    if (touched) {
        socket.emit("fire", engine);
    }
    window.requestAnimationFrame(draw);
}
// For Testing: a, s & d
function getKeyStates() {
    document.addEventListener("keypress", (_event) => {
        let key = _event.key;
        switch (key) {
            case "a":
                left = true;
                break;
            case "s":
                center = true;
                break;
            case "d":
                right = true;
                break;
        }
    });
    document.addEventListener("keyup", (_event) => {
        let key = _event.key;
        switch (key) {
            case "a":
                left = false;
                break;
            case "s":
                center = false;
                break;
            case "d":
                right = false;
                break;
        }
    });
}
function touchStates() {
    // Listen for Player fireing the Engine
    fireButton.addEventListener("mousedown", (_event) => {
        touched = true;
        // socket.emit("fire", engine);
    });
    fireButton.addEventListener("touchstart", (_event) => {
        _event.preventDefault();
        touched = true;
        // socket.emit("fire", engine);
    });
}
//# sourceMappingURL=animation.js.map