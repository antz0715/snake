
// inputDirection This is like a sign that tells the snake which way to go next. It has two parts:
let inputDirection = { x: 0, y: 0 }
// x: This part controls moving left (-1) or right (1). If it's 0, it means don't move sideways
// y: This part controls moving up (-1) or down (1). If it's 0, it means don't move up or down.



let lastInputDirection = { x: 0, y: 0 } // This remembers the last direction sign that was given to the snake. 
//It's used to make sure the snake doesn't suddenly flip back on itself.


// window addevent listener 
//This is like giving the computer a set of instructions on what to do when you press a key on your keyboard.
// It listens for the "keydown" event, which happens every time a key is pressed.

// e.key: This tells us which key was pressed.
window.addEventListener('keydown', e => {
  
  //This is like a decision tree or a set of instructions. 
  //Depending on which key you press (ArrowUp, ArrowDown, ArrowLeft, ArrowRight), it decides what the inputDirection should be.
  switch (e.key) { // 
    case 'ArrowUp':
      // If you press the up arrow, it checks if you were moving up or down before (lastInputDirection.y !== 0).
      // If you were, it does nothing (you can't reverse directly). If not, it changes the direction to move up (inputDirection = { x: 0, y: -1 }).
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown': 
    //If the down arrow is pressed, it does a similar check but for moving down.
    // If moving vertically before, do nothing; otherwise, go down
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      // Pressing the left arrow checks if you were moving left or right before. 
      // If yes, it ignores the press; if no, it tells the snake to go left 
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      // Similar to the left, but for right.
      // Checks if moving horizontally before and changes direction to right if not
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
})


// This function is used to pass the current direction the snake should move in to other parts of the game.
// It also updates the memory of the last direction
export function getInputDirection() {
  lastInputDirection = inputDirection
  //^^/: Before giving out the current direction, it saves it as the last direction. This way, next time a key is pressed, it knows what the last move was.
  return inputDirection
  // Then it sends out the current direction so the snake can use it to move.
}

// Think of the direction like controlling a remote car. If it's going straight, you can't suddenly flip the controls to go the opposite directly; you have to turn it around gradually.
// This code helps manage those rules to make sure your snake doesn't run into itself by flipping backwards.