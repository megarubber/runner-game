let canvas, ctx, mainHeight = window.innerHeight, mainWidth = window.innerWidth, _frames = 0, gameState;
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
        ctx.fillStyle = this.getColor();
        ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
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

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }
}

class Block extends Element {
    constructor(x, y, height, width, color, gravity, speed, jumpForce, ground) {
        super(x, y, height, width, color);
        this.gravity = gravity;
        this.speed = speed;
        this.jumpForce = jumpForce;
        this.numJumps = 0;
        this.ground = ground;
    }

    updateGravity() {
        this.setSpeed(this.getSpeed() + this.getGravity());
        this.setY(this.getY() + this.getSpeed());
    }

    isGrounded() {
        if(this.getY() > this.getGround().getY() - this.getHeight()) {
            this.setY(this.getGround().getY() - this.getHeight());
            this.setNumJumps(0);
        }
    }

    jump() {
        if(this.getNumJumps() < maxJumps) {
            this.setSpeed(-this.getJumpForce());
            this.setNumJumps(this.getNumJumps() + 1);
        }
    }
    
    collision(spawner) {
        for(let i = 0, len = spawner.getAllObstacles().length; i < len; i++) {
            let o = spawner.getSpecificObstacle(i);
            if(this.getX() < o.getX() + o.getWidth() && this.getX() + this.getWidth() >= o.getX() 
            && this.getY() + this.getHeight() >= this.getGround().getY() - o.getHeight())
                gameState = 2;
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
    
    getGround() {
        return this.ground;
    }

    setGround(ground) {
        this.ground = ground;
    }
}

class ObstacleSpawner {
    constructor(ground) {
        this.allObstacles = [];
        this.ground = ground;
        this.spawnDelay = 0;
    }

    spawnNewObstacle() {
        const newX = mainWidth;
        const newWidth = 30 + Math.floor(21 * Math.random());
        const newHeight = 30 + Math.floor(120 * Math.random());
        const newColor = colors[Math.floor(colors.length * Math.random())];
        let obstacle = new Element(newX, this.getGround().getY() - newHeight, newHeight, newWidth, newColor);
        this.getAllObstacles().push(obstacle);
        this.setSpawnDelay(Math.floor(Math.random() * 60) + 40);
    }

    drawNewObstacle() {
        for(let i = 0, len = this.getAllObstacles().length; i < len; i++) {
            let o = this.getSpecificObstacle(i);
            o.drawElement();
        }
    }

    updateEachObstacle() {
        if(this.getSpawnDelay() == 0)
            this.spawnNewObstacle();
        else
            this.setSpawnDelay(this.getSpawnDelay() - 1);
        
        for(let i = 0, len = this.getAllObstacles().length; i < len; i++) {
            let o = this.getSpecificObstacle(i);
            o.setX(o.getX() - speedBackground);

            if(o.getX() <= -o.getWidth()) {
                this.getAllObstacles().splice(i, 1);
                len--;
                i--;
            }
        }
    }

    deleteAll() {
        this.setAllObstacles([]);
        this.setSpawnDelay(0);
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

    setAllObstacles(values) {
        this.allObstacles = values;
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
let player = new Block(50, 0, 50, 50, '#ff4e4e', 1.5, 0, 18, ground);
let spawner = new ObstacleSpawner(ground);

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

    gameState = 0;

    setup();
}

function onClick() {
    //alert('you clicked')
    switch(gameState) {
        case 0:
            gameState = 1;
            break;
        case 1:
            player.jump();
            break;
        case 2:
            gameState = 0;
            break;
        default:
            break;
    }
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
    if(gameState == 1) {
        spawner.updateEachObstacle();
        player.collision(spawner);
    } else spawner.deleteAll();
}

function drawState(color) {
    ctx.fillStyle = color;
    ctx.fillRect(mainWidth / 2 - 50, mainHeight / 2 - 50, 100, 100);
}

function draw() {
    ctx.fillStyle = '#50beff';
    ctx.fillRect(0, 0, mainWidth, mainHeight);
    
    switch(gameState) {
        case 0:
            drawState('green');
            break;
        case 1:
            spawner.drawNewObstacle();
            break;
        case 2:
            drawState('red');
            break;
        default:
            break;
    }
    
    ground.drawElement();
    player.drawElement();
}

main();