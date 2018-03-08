'use strict';
// Enemy Class
// Enemies our player must avoid
class Enemy{
    constructor(x,y){
        // generates a random speed
        this.speed = Math.floor(Math.random()*120 + 100);
        // The x, y coordinates for the enemy
        this.x = x;
        this.y = y;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt){
        // Enemy's movement inside the canvas
        if(this.x<=505){
            // Any movement should be multiplied by dt to ensure 
            // the game has the same speed for all computers
            this.x = this.x + this.speed * dt
        }else{
            this.x = -10;
        }
    }
    // Draw the enemy on the screen
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Player class
// This class requires update, render and handleInput methods  
class Player{
    constructor(x=202,y=380){
        // The x, y coordinates for the player
        this.x = x;
        this.y = y;
        // The image/sprite for our player
        this.sprite = 'images/char-boy.png';
    }
    // Update the player's position
    update(dt){
        // Saving this inside a variable to use it inside the forEach function
        let self = this;
        // If the left key is pressed & the player is not at the left side
        if(this.keyPressed === "left" && this.x > 0){
            this.x -= 102;
        }
        // If the right key is pressed & the player is not at the right side
        if(this.keyPressed === "right" && this.x < 405){
            this.x += 102;
        }
        // If the up key is pressed & the player is not at the top (hasn't reached the water side yet)
        if(this.keyPressed === "up" && this.y > 0){
            this.y -= 82;
        }
        // If the bottom key is pressed & the player is not at the bottom
        if(this.keyPressed === "down" && this.y < 380){
            this.y += 82;
        }
        // If the player reaches the water
        if(this.y < 0){
            this.reset();
        }
        // reset keyPressed to null to jump only when the key is pressed
        this.keyPressed = null;

        // Using "self" the stored variable because "this" is now binded to allEnemies
        allEnemies.forEach(function(enemy){
            if(self.x < enemy.x + 40 && self.x + 60 > enemy.x && self.y < enemy.y + 60 && self.y + 40 > enemy.y) {
                self.reset();
            }
        });
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(e){
        // e is the value of keyCode // left // right // up // down
        this.keyPressed = e;
    }

    reset(){
        this.x = 202;
        this.y = 380;
    }
}


// Now instantiate your objects.
var enemyOne = new Enemy(0,60);
var enemyTwo = new Enemy(0,140); 
var enemyThree = new Enemy(0,225); 

// Place all enemy objects in an array called allEnemies
var allEnemies = [ enemyOne , enemyTwo , enemyThree ];

// Place the player object in a variable called player
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
