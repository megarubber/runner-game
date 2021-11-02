let canvas, ctx, mainHeight = window.innerHeight, mainWidth = window.innerWidth, _frames = 0;
const maxJumps = 3, speedBackground = 6;
const colors = ['#ffbc1c', '#ff1c1c', '#ff85e1', '#52a7ff', '#78ff5d'];

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

    getX() {
        return this.x;
    }

    setX(x) {
        this.x = x; 
    }

    getY() {
        return this.y;
    }

    setY(y) {
        this.y = y; 
    }

    getWidth() {
        return this.width;
    }

    setWidth(width) {
        this.width = width; 
    }

    getHeight() {
        return this.height;
    }

    setHeight(height) {
        this.height = height; 
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
        this.setSpeed(this.getSpeed() += this.getGravity())
        this.setY(this.getY() += this.getSpeed());
    }

    isGrounded(ground) {
        if(this.getY() > ground.getY() - this.getHeight()) {
            this.getY() = ground.y - this.getHeight();
            this.setNumJumps(0);
        }
    }

    jump() {
        if(this.getNumJumps() < maxJumps) {
            this.setSpeed(-this.getJumpForce());
            this.setNumJumps(this.getNumJumps()++);
        }
    }
    
    getSpeed() {
        return this.speed;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    getGravity() {
        return this.gravity;
    }

    setGravity(gravity) {
        this.gravity = gravity;
    }

    getJumpForce() {
        return this.jumpForce;
    }

    setJumpForce(jumpForce) {
        this.jumpForce = jumpForce;
    }

    getNumJumps() {
        return this.numJumps;
    }

    setNumJumps(numJumps) {
        this.numJumps = numJumps;
    }   
}

class ObstacleSpawner {
    constructor(ground) {
        this.allObstacles = [];
        this.ground = ground;
        this.spawnDelay = 0;
    }

    newObstacle() {
        const newX = mainWidth;
        const newWidth = 30 + Math.floor(21 * Math.random());
        const newHeight = 30 + Math.floor(120 * Math.random());
        const newColor = colors[Math.floor(5 * Math.random)];
        let obstacle = new Element(newX, this.ground - newHeight, newWidth, newHeight, newColor);
        this.getAllObstacles().push(obstacle);
    }

    drawNewObstacle() {
        for(let i = 0, len = this.getAllObstacles().length; i < len; i++) {
            let o = this.getSpecificObstacle(i);
            o.drawElement();
        }
    }

    updateEachObstacle() {
        if(this.spawnDelay)
        for(let i = 0, len = this.getAllObstacles().length; i < len; i++) {
            let o = this.getSpecificObstacle(i);
            o.setX(x - speedBackground);
            if(o.getX() <= o.getWidth()) {
                this.getAllObstacles().splice(i, 1);
                len--;
                i--;
            }
        }
    }

    getSpecificObstacle(index) {
        return this.allObstacles[index];
    }

    getAllObstacles() {
        return this.allObstacles;
    }

    setSpecificObstacle(index, obstacle) {
        this.allObstacles[index] = obstacle;
    }

    getSpawnDelay() {
        return this.spawnDelay;
    }

    setSpawnDelay(spawnDelay) {
        this.spawnDelay = spawnDelay;
    }

    getGround(){
        return this.ground;
    }

    setGround(ground) {
        this.ground = ground;
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