let ctx;
let width;
let height;
let staticBackground;
let rocket;
function setup() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.strokeStyle = "none";
    ctx.fillStyle = "rgb(35, 36, 38)";
    ctx.fillRect(0, 0, width, height);
    staticBackground = ctx.getImageData(0, 0, width, height);
    rocket = new Rocket(150, height * .85);
    window.requestAnimationFrame(draw);
}
function draw() {
    ctx.clearRect(0, 0, width, height);
    // ctx.putImageData(staticBackground, 0, 0);
    ctx.fillStyle = "rgb(35, 36, 38)";
    ctx.fillRect(0, 0, width, height);
    // Rakete
    rocket.show();
    rocket.update();
    window.requestAnimationFrame(draw);
}
function createGradient(_c1, _c2, _from, _to) {
    let gradient = ctx.createLinearGradient(0, _from, 0, _to);
    gradient.addColorStop(0, _c1);
    gradient.addColorStop(1, _c2);
    return gradient;
}
//# sourceMappingURL=animation.js.map