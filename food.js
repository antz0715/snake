import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition()
const EXPANSION_RATE = 5

export function update() {
//Think of this method as the game's rule checker that runs every time the game updates (like every tick of a clock in the game).
// It checks to see if the snake has eaten food.  
  if (onSnake(food)) { //  This is like asking, "Has the snake's head touched the food?"
    expandSnake(EXPANSION_RATE) // If the snake has eaten the food, this makes the snake longer.
    // Here, EXPANSION_RATE is 5, which means the snake grows by 5 units each time it eats food.
    food = getRandomFoodPosition() // After the snake eats the food, this part finds a new spot for the food to appear that is not where the snake is.
  }
  // Imagine you’re playing a game of tag where eating a cookie makes you longer (kind of like a conga line).
  // Every time you touch a cookie, you check if you got it (if yes, you add more people to your line and get a new cookie placed somewhere else)
}

export function draw(gameBoard) { //This method draws the food on the screen each time the game updates.
  // It's like painting a new picture on a canvas based on where everything should be
  const foodElement = document.createElement('div') // This is like creating a blank square or piece of paper to draw on.
  foodElement.style.gridRowStart = food.y // This sets the vertical position of the food on the game board.
  foodElement.style.gridColumnStart = food.x // This sets the horizontal position of the food.
  foodElement.classList.add('food') //  This adds a special label to our square so that it looks like food (perhaps it gets a certain color or picture)
  gameBoard.appendChild(foodElement) // Finally, this puts our newly drawn food on the game board, so it appears in the game.
//It’s like placing a sticker on a board at a specific spot. If you have a board with grids, you're placing the sticker exactly where it should go according to the game's rules.
}

// This method finds a new spot on the game board for the food that isn’t already taken by the snake.
function getRandomFoodPosition() {
  let newFoodPosition 
  while (newFoodPosition == null || onSnake(newFoodPosition)) { //This is like searching for a clean spot to drop a new cookie where no one is standing. 
    //If the first spot you pick is taken, you keep searching until you find a free spot.
    newFoodPosition = randomGridPosition() //  This picks a random position on the board. If it's already occupied by the snake, it picks another one
  }
  return newFoodPosition
  // Imagine you're setting up a game of musical chairs, but you need to make sure you don't place a chair where someone is already standing. 
  // You keep looking for an empty spot to put the chair down.
}