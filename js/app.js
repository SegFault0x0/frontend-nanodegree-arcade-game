/* GLOBAL VARS */
var allEnemies = [];

/* CONSTANTS */
var NUM_OF_ENEMIES = 1;
var BOUNDS_X = 400;
var BOUNDS_Y = 400;
var PLAYER_START_X = 200;
var PLAYER_START_Y = 400;
var MOVE_X = 100;
var MOVE_Y = 90;


// Enemies our player must avoid
var Enemy = function() {
    var obj = Object.create(Enemy.prototype);

    // Add Enemy properties
    obj.sprite = 'images/enemy-bug.png';
    obj.x = 0;
    obj.y = 50;
    return obj;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x >= canvas.width) ? 0 : this.x + (100 * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    var obj = Object.create(Player.prototype);

    // Add Player properties
    obj.sprite = 'images/char-boy.png';
    obj.x = PLAYER_START_X;
    obj.y = PLAYER_START_Y;

    return obj;
}

Player.prototype.update = function() {
    // Reset the player position if the player reaches the river/wins.
    if (this.y <= 0) {
       this.x = PLAYER_START_X;
       this.y = PLAYER_START_Y;
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x > 0) {
                this.x -= MOVE_X;
            }

            break;

        case 'right':
            if (this.x < BOUNDS_X) {
                this.x += MOVE_X;
            }

            break;

        case 'up':
            if (this.y > 0) {
                this.y -= MOVE_Y;
            }

            break;

        case 'down':
            if (this.y < BOUNDS_Y) {
                this.y += MOVE_Y;
            }

            break;

        default:
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
for (var i = 0; i < NUM_OF_ENEMIES; ++i) {
    allEnemies.push(new Enemy());
}
var player = Player();

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
