var canvas, ctx, _height, _width, frames = 0;

function main() { // oh no is c language
    _height = window.innerHeight;
    _width = window.innerWidth;

    if(_width >= 500) {
        _width = 600;
        _height = 600;
    }

    canvas = document.createElement("canvas");
    canvas.width = _width;
    canvas.height = _height;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    document.addEventListener("mousedown", onClick);
}

function onClick() {
    alert('you clicked')
}

function setup() {

}

function update() {

}

function draw() {

}

main();