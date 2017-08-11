DEBUG = true;  //if true draw collision boxes around player and enemy

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = 225;
    this.width = 101;
    this.height = 171;
    this.speed = this.newSpeed();
    console.log(this.speed);
};

Enemy.prototype.newSpeed = function() {
    var min = 200;
    var max = 400;
    return Math.floor(Math.random() * (max - min)) + min;
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
        this.speed = this.newSpeed();
        console.log(this.speed);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (DEBUG) {
         ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 380;
    this.width = 101;
    this.height = 171;
};

Player.prototype.update = function() {
    this.xstep = 101;
    this.ystep = 80;  
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(DEBUG){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
};

Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0) {
        this.x -= this.xstep;
    } else if (key === 'right' && this.x < 404) {
        this.x += this.xstep;
    } else if (key === 'up' && this.y > -20) {
        this.y -= this.ystep;
    } else if (key === 'down' && this.y < 380) {
        this.y += this.ystep; 
    }
console.log(this.x, this.y);
    //console.log(ctx.canvas.width, ctx.canvas.height);

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var allEnemies = [enemy1];
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
