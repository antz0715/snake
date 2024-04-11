// This code controls how the snake moves, grows, and interacts with other objects on the game board.
// It includes functions to update and draw the snake, make it bigger, check if it's touching something, and more.

import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 5 // This is how fast the snake moves. A higher number means faster movement.
const snakeBody = [{ x: 11, y: 11 }] // A list that keeps track of all the parts of the snake. Each part is a spot on the game board (like a block in a line).
let newSegments = 0 // This is how many new blocks we want to add to the snake's tail.

export function update() { // This function is like the snake's brain, telling it how to move and grow every time the game updates
  addSegments() // Before the snake moves, this adds any new blocks to the snake's body if it has eaten food.

  const inputDirection = getInputDirection() 
  // This gets the direction from the keyboard inputs to know where to move next.
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    // The for loop (for (let i = snakeBody.length - 2; i >= 0; i--)) goes through the snake from tail to head,
    // making each block follow the one in front of it, so the whole snake moves in a line.
    snakeBody[i + 1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
  // move the head of the snake in the direction you pressed on the keyboard.
}

export function draw(gameBoard) { // This function draws the snake on the screen.
  snakeBody.forEach(segment => { // This goes through each block of the snake and puts it on the game board.
    const snakeElement = document.createElement('div') // creates a new block, and styles are added to place it correctly on the board.
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement) // This puts the styled block onto the game board so you can see it.
  })
}

export function expandSnake(amount) { // This function makes the snake longer by the number amount.
  newSegments += amount // It adds the given number to newSegments, which tells addSegments() how many new blocks to add to the snake.
}

export function onSnake(position, { ignoreHead = false } = {}) { // This function checks if a given position (like where the food is) is where any part of the snake is.
  return snakeBody.some((segment, index) => { // This goes through each block of the snake and checks if it’s at the given position. If ignoreHead is true, it skips the head to avoid false positives (like thinking the snake has bitten itself when it hasn't).
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

export function getSnakeHead() { // This function returns the position of the snake's head
  return snakeBody[0] //  Since the head is always the first block in the snakeBody list, it returns that.
}

export function snakeIntersection() { // This checks if the snake has run into itself.
  return onSnake(snakeBody[0], { ignoreHead: true }) // It uses onSnake to see if the head’s position matches any other part of the snake, ignoring the head itself.
}

function equalPositions(pos1, pos2) { // This function checks if two positions on the board are the same.
  return pos1.x === pos2.x && pos1.y === pos2.y //  It compares the x and y coordinates of two positions to see if they match.
}

function addSegments() { // This function adds new blocks to the snake's body.
  for (let i = 0; i < newSegments; i++) { // It loops through newSegments and copies the last block of the snake each time, adding it to the end.
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }

  newSegments = 0 // Sets it back to 0 after adding the blocks.
}

// Imagine you are leading a line of kids in a game. Every time you eat a candy, you get a ticket to add another kid at the end of the line. 
//Each kid follows the one in front, moving exactly where they moved.
// The update function is like deciding every second which way the line will move next based on where the leader (the head kid) decides to go.