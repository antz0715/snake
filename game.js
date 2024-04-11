// This code controls the overall game flow: it updates and draws what happens in the game 
//(like the snake moving or eating) and checks if the game should end (like if the snake hits the edge or itself).

import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0 // This remembers when the game last updated everything on the screen.
let gameOver = false // This is a true/false value that tells us if the game has ended because the snake crashed.
const gameBoard = document.getElementById('game-board') // This is the area on the webpage where your snake game appears.

function main(currentTime) { // This is the main function that runs continuously as the game plays. It updates and draws the game repeatedly at intervals based on the snake's speed.
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/'
      // If gameOver is true, it shows a message asking if you want to restart. If you click "ok," it reloads the page to start over.
    }
    return
  }


  window.requestAnimationFrame(main) // is a way to tell the browser: "Hey, I want to update and draw the game again whenever you're ready." This makes sure the game runs smoothly.
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000 //: It calculates how long it's been since the last update (secondsSinceLastRender) 
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return // and only updates the game if enough time has passed based on SNAKE_SPEED.


  lastRenderTime = currentTime

  update() 
  draw()
}

window.requestAnimationFrame(main)

function update() {  // This function updates all the game's parts, like moving the snake or new food appearing.
  updateSnake() // Calls the function that moves the snake.
  updateFood() // Calls the function that manages food appearance and eating.
  checkDeath() // Checks if the game should end, either because the snake went out of bounds or ran into itself.
}

function draw() { // This function draws or shows all the current game state on the game board.
  gameBoard.innerHTML = '' // clears everything currently drawn, so there are no old images of the snake or food from the last frame.
  drawSnake(gameBoard)
  //  It puts the updated images of the snake and food on the game board.
  drawFood(gameBoard)
}

function checkDeath() { // This function checks if the snake has died either by going out of bounds or by hitting itself.
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
  // : It uses outsideGrid(getSnakeHead()) to see if the snake's head has moved outside the game area and snakeIntersection() to check if the snake has run into itself
  //  If either condition is true, it sets gameOver to true, stopping the game.
}

// Imagine you're drawing a flipbook animation. Each page of the flipbook is a frame of the animation. You draw a snake moving across the pages:

// Every new page (frame), you decide where the snake goes next.
// If the snake runs into the edge of the page or into a line it already drew (itself), you stop the flipbook and tell everyone watching, "It's over, the snake crashed!"
// If they want to see it again, you flip back to the first page and start over.

// This code works similarly: it keeps updating and drawing new "pages" or frames of the game, and stops if the snake crashes, giving an option to restart.