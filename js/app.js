/* GLOBAL VARS */
var allEnemies = [];

/* CONSTANTS */
var NUM_OF_ENEMIES = 3;
var ENEMY_ROWS = [60, 140, 230];
var BOUNDS_X = 400;
var BOUNDS_Y = 400;
var PLAYER_START_X = 200;
var PLAYER_START_Y = 400;
var MOVE_X = 100;
var MOVE_Y = 90;
var SPEED_MAX = 5;
var RAND_SPEED = Math.floor(Math.random() * SPEED_MAX) + 1;


// Enemies our player must avoid
var Enemy = function(row) {
    // Add Enemy properties
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = ENEMY_ROWS[row];
    this.speed = 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // The dt parameter ensures that the game runs at the same speed for
    // all computers.
    if (this.x >= canvas.width) {
        // Restart enemy trip once they reach the end of their run
        this.x = 0;
        this.speed = RAND_SPEED;
    }

    // Animate the enemy
    this.x += (this.speed * 100) * dt;

    // Check for collision with Player
    if ((this.y > player.y - (MOVE_Y / 2)) &&
        (this.y < player.y + (MOVE_Y / 2))) {
        if ((this.x + (MOVE_X / 2) > player.x) &&
            (this.x - (MOVE_X / 2) < player.x)) {
            // Reset the player position if collision detected.
            reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Add Player properties
    this.sprite = 'images/char-boy.png';
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
}

Player.prototype.update = function() {
    if (this.y <= 0) {
        // Reset the player position if the player reaches the river/wins.
        reset();
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
    allEnemies.push(new Enemy(i));
}

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
