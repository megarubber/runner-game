var canvas, ctx, _height, _width, _frames = 0;

ground = {
    _y : 550,
    _height : 50,
    _color : '#ffdf70',

    drawGround : function() {
        ctx.fillStyle = this._color;
        ctx.fillRect(0, this._y, _width, this._height);
    }
};

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

    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    document.addEventListener('mousedown', onClick);

    setup();
}

function onClick() {
    alert('you clicked')
}

function setup() {
    update();
    draw();

    window.requestAnimationFrame(setup);
}   

function update() {
    _frames++;
}

function draw() {
    ctx.fillStyle = '#50beff';
    ctx.fillRect(0, 0, _width, _height);

    ground.drawGround();
}

main();