let canvas, ctx, mainHeight = window.innerHeight, mainWidth = window.innerWidth, _frames = 0;
const maxJumps = 3;


class Element {
    constructor(x, y, height, width, color) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
    }

    drawElement() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Block extends Element {
    constructor(x, y, height, width, color, gravity, speed, jumpForce) {
        super(x, y, height, width, color);
        this.gravity = gravity;
        this.speed = speed;
        this.jumpForce = jumpForce;
        this.numJumps = 0;
    }

    updateGravity() {
        this.speed += this.gravity;
        this.y += this.speed;
    }

    isGrounded(ground) {
        if(this.y > ground.y - this.height) {
            this.y = ground.y - this.height;
            this.numJumps = 0;
        }
    }

    jump() {
        if(this.numJumps < maxJumps) {
            this.speed = -this.jumpForce;
            this.numJumps++;
        }
    }
}

getMainDimensions();

let ground = new Element(0, 550, 50, mainWidth, '#ffdf70');
let player = new Block(50, 0, 50, 50, '#ff4e4e', 1.5, 0, 15);

/* All game functions */

function main() { // oh no is c language
    getMainDimensions();

    canvas = document.createElement('canvas');
    canvas.width = mainWidth;
    canvas.height = mainHeight;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    document.addEventListener('mousedown', onClick);

    setup();
}

function onClick() {
    //alert('you clicked')
    player.jump();
}

function getMainDimensions() {
    mainHeight = window.innerHeight;
    mainWidth = window.innerWidth;

    if(mainHeight >= 500) {
        mainWidth = 600;
        mainHeight = 600;
    }
}

function setup() {
    update();
    draw();

    window.requestAnimationFrame(setup);
}   

function update() {
    _frames++;
    player.updateGravity();
    player.isGrounded(ground);
}

function draw() {
    ctx.fillStyle = '#50beff';
    ctx.fillRect(0, 0, mainWidth, mainHeight);

    ground.drawElement();
    player.drawElement();
}

main();