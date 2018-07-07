let ctx;
let width;
let height;
let staticBackground;
function setup() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.strokeStyle = "none";
    ctx.fillStyle = "rgb(35, 36, 38)"; //createGradient("rgb(10, 1, 58)", "rgb(60, 50, 130)", 0, height);
    ctx.fillRect(0, 0, width, height);
}
function draw() {
}
function createGradient(_c1, _c2, _from, _to) {
    let gradient = ctx.createLinearGradient(0, _from, 0, _to);
    gradient.addColorStop(0, _c1);
    gradient.addColorStop(1, _c2);
    return gradient;
}
//# sourceMappingURL=animation.js.map