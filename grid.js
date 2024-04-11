const GRID_SIZE = 21


//This method is like rolling a dice to decide where on the game board (or grid) to put something, 
//like a fruit for the snake to eat. But instead of just one number, 
//you get two numbers: 
//one for the left-right position (we call this x) 
//and one for the up-down position (we call this y).

export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1, //+ 1: We add 1 because our game board starts at 1, not 0. 
    y: Math.floor(Math.random() * GRID_SIZE) + 1  // So if our wheel stops at 0 (the first section), we turn it into 1 (the first square on the board).
    // Math.random(): This is like spinning a wheel that can stop at any number between 0 and just under 1.
    // It's our way of getting a random number.

    //Math.floor(Math.random() * GRID_SIZE): Imagine the wheel has 21 sections (from 0 to 20), and where it stops decides our number.
    // We use Math.floor to round down to the nearest whole number. This makes sure we stay within the game board numbers, which are from 1 to 21.
  }
  // This method returns an object with two properties (x and y), each being a number from 1 to 21, which tells us a random position on the grid
}//Suppose you have a board game with a grid of 21 squares by 21 squares. 
//You close your eyes and throw two darts—one decides the horizontal position (left-right), and the other decides the vertical position (up-down) of something important on the board, like where to place a treasure.




// This method checks if something, like the snake or a part of it, has moved outside the playing area, which is the board. 
// It's like having a rule in a playground game that says if you step outside the lines, you're "out."



export function outsideGrid(position) {
  return ( //  If any of those checks show that you're outside, this method says true (yes, you're out), and if not, it says false (no, you're still in).
    position.x < 1 || position.x > GRID_SIZE ||
    position.y < 1 || position.y > GRID_SIZE
    // position.x < 1 || position.x > GRID_SIZE: This checks if the x value is less than 1 or more than 21. 
    // If either is true, it means you've gone outside the board on the left or right side.

    // position.y < 1 || position.y > GRID_SIZE: This checks the same thing but for the y value (up-down).
    // If it's outside the range of 1 to 21, you've gone outside the board at the top or bottom.

    // Think about playing in a rectangular yard with clearly marked boundaries.
    // If you step outside these lines while playing a game, you're "out."
    // This function is like having a friend watching to tell you whether you stepped out or not.
  )
}