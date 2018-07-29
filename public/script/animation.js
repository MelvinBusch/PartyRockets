let ctx;
let width;
let height;
let staticBackground;
let base;
let stars;
let moon;
let barrels;
let rocket;
let left = false;
let center = false;
let right = false;
let countdown;
let animation;
let frameCount;
let game = false;
function setup() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    frameCount = 1;
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
    rocket = new Rocket(140, height - 70);
    // Base
    base = new Base();
    // Mond
    moon = new Moon(Math.floor(width * .8), Math.floor(height * .3));
    // Sterne
    stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push(new Star());
    }
    // Barrels
    barrels = [];
    for (let i = 0; i < 2; i++) {
        barrels.push(new Barrel());
    }
    countdown = new Countdown(5, width / 2, height / 2);
    countdown.count(() => game = true);
    draw();
}
function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(staticBackground, 0, 0);
    // Evaluate TouchEvents from Socket
    socket.on("left", (_touched) => {
        left = _touched;
    });
    socket.on("center", (_touched) => {
        center = _touched;
    });
    socket.on("right", (_touched) => {
        right = _touched;
    });
    // Sterne
    stars.forEach((star) => star.show());
    // Treibstoffanzeige
    ctx.fillStyle = "rgb(98, 170, 189)"; // hellblau
    ctx.fillRect(50, 30, rocket.fuel, 15);
    ctx.font = "14px monospace";
    ctx.textAlign = "left";
    ctx.fillText("Fuel", 50, 60);
    // Base
    base.show();
    // Barrels
    for (let i = barrels.length - 1; i >= 0; i--) {
        let _barrel = barrels[i];
        _barrel.show();
        if (hitBarrel(_barrel)) {
            rocket.refuel(_barrel.fuel);
            barrels.splice(barrels.indexOf(_barrel), 1);
            barrels.push(new Barrel());
        }
    }
    // Mond
    moon.show();
    // Countdown
    countdown.show();
    // Rakete
    rocket.show();
    if (game) {
        rocket.update();
        if (!(left || center || right))
            rocket.gravity();
        if (left) {
            rocket.left();
        }
        if (center) {
            rocket.center();
        }
        if (right) {
            rocket.right();
        }
    }
    // Game End
    if (moonLanding()) {
        game = false;
        socket.emit("gameOver", {
            success: true,
            message: "Congratulations, you reached the moon!"
        });
        window.cancelAnimationFrame(animation);
        return;
    }
    if (lostInSpace()) {
        game = false;
        socket.emit("gameOver", {
            success: false,
            message: "You got lost in Space!"
        });
        window.cancelAnimationFrame(animation);
        return;
    }
    if (noFuel()) {
        game = false;
        console.log("No Fuel!");
        socket.emit("gameOver", {
            success: false,
            message: "You wasted too much fuel!"
        });
        window.cancelAnimationFrame(animation);
        return;
    }
    frameCount++;
    animation = window.requestAnimationFrame(draw);
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
function moonLanding() {
    let dist = Math.sqrt(Math.pow(moon.pos.x - rocket.pos.x + (rocket.img.width / 2), 2) + Math.pow(moon.pos.y - rocket.pos.y + (rocket.img.height / 2), 2));
    return dist < 150;
}
function lostInSpace() {
    let border = 250;
    return rocket.pos.x < -border || rocket.pos.x > width + border || rocket.pos.y < -border || rocket.pos.y > height + border;
}
function hitBarrel(_barrel) {
    let dist = Math.sqrt(Math.pow(_barrel.pos.x - rocket.pos.x + (rocket.img.width / 2), 2) + Math.pow(_barrel.pos.y - rocket.pos.y + (rocket.img.height / 2), 2));
    return dist < 75;
}
function noFuel() {
    return rocket.fuel < 0;
}
//# sourceMappingURL=animation.js.map