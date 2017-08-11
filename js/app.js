const DEBUG = true;  //if true draw collision boxes around player and enemy

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = this.randomY();
    //there is a lot of tranparentie around the player image
    //the values below represent the actual image
    this.imageOffsetX = 2;
    this.imageOffsetY = 80;
    this.imageWidth = 97;
    this.imageHeight = 63;
    this.speed = this.newSpeed();
    console.log(this.speed);
};

Enemy.prototype.randomY = function() {
    var min = 0;
    var max = 3;
    var rand = Math.floor(Math.random() * (max - min)) + min;
    var yOptions = [65, 145 , 230];
    return yOptions[rand]; 
};

Enemy.prototype.newSpeed = function() {
    var min = 200  + (20 * score);
    var max = 400 + (40 * score);
    return (Math.floor(Math.random() * (max - min)) + min);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var movement = this.speed * dt;
    if(this.x < 505) {
        this.x += movement;
    } else {
        this.x = -100;
        this.y = this.randomY();
        this.speed = this.newSpeed();
    }
    
    //check for collision between enemy and player
    var rect = {
        x: this.x + this.imageOffsetX,
        y: this.y + this.imageOffsetY,
        width: this.imageWidth,
        height: this.imageHeight};
    var rectPlayer = {
        x: player.x + player.imageOffsetX,
        y: player.y + player.imageOffsetY,
        width: player.imageWidth,
        height: player.imageHeight};
    if (rect.x < rectPlayer.x + rectPlayer.width &&
        rect.x + rect.width > rectPlayer.x &&
        rect.y < rectPlayer.y + rectPlayer.height &&
        rect.height + rect.y > rectPlayer.y) {
            player.reset();
            score = 0;
            allEnemies=[new Enemy(), new Enemy()];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (DEBUG) {
        ctx.strokeRect(
            this.x + this.imageOffsetX,
            this.y + this.imageOffsetY,
            this.imageWidth,
            this.imageHeight);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 400;
    
    //there is a lot of tranparentie around the player image
    //the values below represent the actual image
    this.imageOffsetX = 20;
    this.imageOffsetY = 63;
    this.imageWidth = 62;
    this.imageHeight = 75;
};

Player.prototype.update = function() {
    this.xstep = 101;
    this.ystep = 82;  
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(DEBUG){
        ctx.strokeRect(
            this.x + this.imageOffsetX,
            this.y + this.imageOffsetY,
            this.imageWidth,
            this.imageHeight);
    }
};

Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0) {
        this.x -= this.xstep;
    } else if (key === 'right' && this.x < 404) {
        this.x += this.xstep;
    } else if (key === 'down' && this.y < 380) {
        this.y += this.ystep; 
    } else if (key === 'up') {
        if (this.y > -10) {
            this.y -= this.ystep;
        } else {
            score++;
            if (score > bestScore) {
                bestScore = score;
            }
            if (score % 5 === 0){
                allEnemies.push(new Enemy());
            }
            this.reset();
        }
    }
};

Player.prototype.reset = function () {
    this.x = 202;
    this.y = 400;
};

var score = 0;
var bestScore = 0;

function drawScore() {
    ctx.font = "30px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 10, 574);
    ctx.fillText("Best score: "+bestScore, 10, 534);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
