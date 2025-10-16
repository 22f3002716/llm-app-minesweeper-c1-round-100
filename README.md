# Minesweeper Game

A simple 8x8 Minesweeper game implemented as a single-page web application. The goal is to clear the board without clicking on any of the hidden mines.

## Features

*   **8x8 Grid:** A classic Minesweeper board size for a quick game.
*   **10 Mines:** Ten randomly placed mines challenge your deduction skills.
*   **Mine Count:** Cells reveal the number of adjacent mines, aiding your strategy.
*   **Recursive Reveal:** Clicking an empty cell (with no adjacent mines) automatically reveals all contiguous empty cells and their numbered borders, mimicking the classic game behavior.
*   **Game Over State:** If you click on a mine, the game ends immediately, all mines are revealed, and a "BOOM! Game Over." message is displayed.

## How to Run

1.  **Save Files:** Save `index.html`, `style.css`, and `script.js` into the same directory on your computer.
2.  **Open in Browser:** Open the `index.html` file using your preferred web browser (e.g., Chrome, Firefox, Edge). You can usually do this by double-clicking the `index.html` file.
3.  **Play:** Start clicking cells! Be careful not to hit a mine.

## Game Rules

*   **Click to Reveal:** Click on a cell to reveal what's underneath.
*   **Numbers:** If a number appears, it indicates how many mines are in the 8 surrounding cells.
*   **Empty Cells:** If a cell is empty (no number appears), it means there are no mines next to it, and the game will automatically clear adjacent empty cells for you.
*   **Mines:** If you click a mine (represented by a bomb emoji 💣 when revealed), it's game over!
*   **Winning:** (The current implementation focuses on the Game Over state. A win condition by revealing all non-mine cells is not explicitly implemented.)

## Technologies Used

*   HTML5
*   CSS3
*   JavaScript (ES6+)

Enjoy the game!
