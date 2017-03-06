'use strict';

/* GLOBAL VARS */
var allEnemies = [];

/* CONSTANTS */
var playerData = {
    image: 'images/char-boy.png',
    startX: 200,
    startY: 400,
};

var enemyData = {
    image: 'images/enemy-bug.png',
    startX: 0,
    startY: [60, 140, 230],
};

var options = {
    numOfEnemyRows: enemyData.startY.length,
    numOfEnemies: 5,
    xBounds: 400,
    yBounds: 400,
    moveX: 100,
    moveY: 90,
    speedMax: 5,
};


// Create the player class
// This class requires an update(), render() and a handleInput() method.
var Player = function(data) {
    // Add Player properties
    this.sprite = data.image;
    this.x = data.startX;
    this.y = data.startY;
};

Player.prototype = {
    update: function() {
        if (this.y <= 0) {
            // Reset the player position if the player reaches the river/wins.
            reset();
        }
    },

    // Draw a player on the screen
    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },

    handleInput: function(key) {
        switch (key) {
            case 'left':
                if (this.x > 0) {
                    this.x -= options.moveX;
                }

                break;

            case 'right':
                if (this.x < options.xBounds) {
                    this.x += options.moveX;
                }

                break;

            case 'up':
                if (this.y > 0) {
                    this.y -= options.moveY;
                }

                break;

            case 'down':
                if (this.y < options.yBounds) {
                    this.y += options.moveY;
                }

                break;

            default:
                break;
        }
    },
};

// Enemies our player must avoid
var Enemy = function(row) {
    // Add Enemy properties
    // Overwrite the initial Y position
    var data = Object.assign(
        {},
        enemyData,
        {startY: enemyData.startY[row]}
    );
    Player.call(this, data);
    this.speed = 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype = Object.create(Player.prototype, {
    update: {
        enumerable: true,
        value: function(dt) {
            if (this.x >= canvas.width) {
                // Restart enemy trip once they reach the end of their run
                this.x = 0;

                // Randomly select the pavement row.
                var row = Math.floor(Math.random() * options.numOfEnemyRows);
                this.y = enemyData.startY[row];

                this.updateSpeed();
            }

            // Animate the enemy.  The dt parameter ensures that the game runs
            // at the same speed for all computers.
            this.x += (this.speed * 100) * dt;

            // Check for collision with Player
            if ((this.y > player.y - (options.moveY / 2)) &&
                (this.y < player.y + (options.moveY / 2))) {
                if ((this.x + (options.moveX /2) > player.x) &&
                    (this.x - (options.moveX /2) < player.x)) {
                   // Reset the player position if collision detected.
                   reset();
                }
            }
        },
    },

    updateSpeed: {
        enumerable: true,
        value: function() {
            this.speed = Math.floor(Math.random() * options.speedMax) + 1;
        },
    },
});


// Instantiate Enemey and Player objects.
for (var i = 0; i < options.numOfEnemies; ++i) {
    allEnemies.push(new Enemy(i % options.numOfEnemyRows));
}

var player = new Player(playerData);

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
